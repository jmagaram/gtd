import {
  BehaviorSubject,
  empty as emptyObs,
  merge,
  Observable as Obs,
  of as obsOf,
  Subject
} from "rxjs";
import { map, mergeMap, takeUntil, withLatestFrom } from "rxjs/operators";

export interface Store<State, Action> {
  state$: Obs<State>;
  dispatch(action: Action): void;
  dispatchObservable(action$: AsyncProcess<State, Action>): void;
  shutdown(): void;
}

export interface Context<State, Action> {
  state$: Obs<State>;
  action$: Obs<Action>;
  shutdown$: Obs<any>;
}

// ActionProcessor
// Middleware
// Processor
// dispatchObservable
//

export type ActionProcessor<State, Action> = (
  { state$, action$, shutdown$ }: Context<State, Action>
) => {
  forward$: Obs<Action>;
  dispatch$: Obs<Action>;
};

export type AsyncProcess<State, Action> = (
  { state$, action$, shutdown$ }: Context<State, Action>
) => Obs<Action>;

const chainTwoActionProcessors = <State, Action>(
  a: ActionProcessor<State, Action>,
  b: ActionProcessor<State, Action>
): ActionProcessor<State, Action> => ({
  state$,
  action$,
  shutdown$
}: Context<State, Action>) => {
  const aResult = a({ state$, action$, shutdown$ });
  const bResult = b({ state$, action$: aResult.forward$, shutdown$ });
  return {
    forward$: bResult.forward$,
    dispatch$: merge(aResult.dispatch$, bResult.dispatch$)
  };
};

const chainActionProcessors = <State, Action>(
  first: ActionProcessor<State, Action>,
  rest: Array<ActionProcessor<State, Action>>
) => rest.reduce(chainTwoActionProcessors, first);

const forwardAll = <State, Action>(): ActionProcessor<State, Action> => ({
  action$
}: Context<State, Action>) => ({ forward$: action$, dispatch$: emptyObs() });

export type Reducer<State, Action> = (
  previousState: State,
  action: Action
) => State;

export function create<State, Action>(
  initialState: State,
  reducer: Reducer<State, Action>,
  ...middleware: Array<ActionProcessor<State, Action>>
): Readonly<Store<State, Action>> {
  const shutdown$ = new Subject<any>();
  const stateSubject$ = new BehaviorSubject<State>(initialState);
  const state$ = stateSubject$.asObservable().pipe(takeUntil(shutdown$));
  const actionSource$$ = new Subject<Obs<Action>>();
  const actionSource$ = actionSource$$.pipe(
    mergeMap(i => i),
    takeUntil(shutdown$)
  );
  const actionProcessor = chainActionProcessors(
    forwardAll<State, Action>(),
    middleware
  );
  const shutdown = () => {
    shutdown$.next(true);
    shutdown$.complete();
  };
  const dispatch = (a: Action) => dispatchStream(obsOf(a));
  const dispatchObservable = (action$: AsyncProcess<State, Action>) => {
    actionSource$$.next(action$({ state$, action$: actionSource$, shutdown$ }));
  };
  const dispatchStream = (a$: Obs<Action>) => actionSource$$.next(a$);
  const actionsAfterMiddleware = actionProcessor({
    state$,
    action$: actionSource$,
    shutdown$
  });
  actionsAfterMiddleware.forward$
    .pipe(
      takeUntil(shutdown$),
      withLatestFrom(state$),
      map(([action, state]) => reducer(state, action))
    )
    .subscribe(n => stateSubject$.next(n));
  actionsAfterMiddleware.dispatch$
    .pipe(takeUntil(shutdown$))
    .subscribe(n => dispatch(n));
  const result = {
    state$,
    dispatch,
    dispatchObservable,
    shutdown
  };
  return result;
}
