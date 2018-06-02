import {
  BehaviorSubject,
  empty,
  merge,
  Observable as Obs,
  of as observableOf,
  Subject
} from "rxjs";
import {
  map,
  mergeMap,
  takeUntil,
  withLatestFrom,
  delay
} from "rxjs/operators";

export interface Store<State, Action> {
  state$: Obs<State>;
  dispatch(action: Action): void;
  dispatchStream(action$: Obs<Action>): void;
  dispatchObservable(
    factory: (
      context: Partial<{
        action$: Obs<Action>;
        state$: Obs<State>;
        shutdown$: Obs<any>;
      }>
    ) => Obs<Action>
  ): void;
  shutdown(): void;
}

interface Context<State, Action> {
  state$: Obs<State>;
  action$: Obs<Action>;
  shutdown$: Obs<any>;
}

export type ActionProcessor<State, Action> = (
  { state$, action$, shutdown$ }: Context<State, Action>
) => {
  forward$: Obs<Action>;
  dispatch$: Obs<Action>;
};

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
}: Context<State, Action>) => ({ forward$: action$, dispatch$: empty() });

export type Reducer<State, Action> = (
  previousState: State,
  action: Action
) => State;

export function create<State, Action>(
  initialState: State,
  reducer: Reducer<State, Action>,
  ...middleware: Array<ActionProcessor<State, Action>>
): Store<State, Action> {
  const state$ = new BehaviorSubject<State>(initialState);
  const shutdown$ = new Subject<any>();
  const actionSource$$ = new Subject<Obs<Action>>();
  const actionSource$ = actionSource$$.pipe(
    mergeMap(i => i),
    takeUntil(shutdown$)
  );
  const actionProcessor = chainActionProcessors(
    forwardAll<State, Action>(),
    middleware
  );
  const dispatch = (a: Action) => dispatchStream(observableOf(a));
  const dispatchStream = (a$: Obs<Action>) => actionSource$$.next(a$);
  const dispatchObservable = (
    factory: (
      context: Partial<{
        action$: Obs<Action>;
        state$: Obs<State>;
        shutdown$: Obs<any>;
      }>
    ) => Obs<Action>
  ) => dispatchStream(factory({ state$, action$: actionSource$, shutdown$ }));
  const actionsAfterMiddleware = actionProcessor({
    state$,
    action$: actionSource$,
    shutdown$
  });
  actionsAfterMiddleware.forward$ // take until
    .pipe(
      withLatestFrom(state$),
      map(([action, state]) => reducer(state, action))
    )
    .subscribe(n => state$.next(n));
  actionsAfterMiddleware.dispatch$.pipe(delay(0)).subscribe(n => dispatch(n)); // take until
  // actionsAfterMiddleware.forward$
  //   .pipe(map(a => reducer(state$.value, a)))
  //   .subscribe(n => state$.next(n)); // take until
  const result = {
    state$: state$.asObservable().pipe(takeUntil(shutdown$)),
    dispatch,
    dispatchStream,
    dispatchObservable,
    shutdown: () => shutdown$.next(true)
  };
  Object.freeze(result);
  return result;
}
