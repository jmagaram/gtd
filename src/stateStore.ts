import {
  BehaviorSubject,
  empty as emptyObs,
  merge,
  Observable as Obs,
  of as obsFrom,
  Subject
} from "rxjs";
import { map, mergeMap, takeUntil, withLatestFrom } from "rxjs/operators";

export interface Store<State, Action> {
  state$: Obs<State>;
  dispatch(action: Action): void;
  dispatchEpic(action$: Epic<State, Action>): void;
  shutdown(): void;
}

export type Reducer<State, Action> = (previous: State, action: Action) => State;

export interface Context<State, Action> {
  state$: Obs<State>;
  action$: Obs<Action>;
  shutdown$: Obs<any>;
}

export type Middleware<State, Action> = (
  { state$, action$, shutdown$ }: Context<State, Action>
) => {
  forward$: Obs<Action>;
  dispatch$: Obs<Action>;
};

export type Epic<State, Action> = (
  { state$, action$, shutdown$ }: Context<State, Action>
) => Obs<Action>;

const chainMiddleware = <State, Action>(
  fst: Middleware<State, Action>,
  snd: Middleware<State, Action>
) => ({ state$, action$, shutdown$ }: Context<State, Action>) => {
  const fstRes = fst({ state$, action$, shutdown$ });
  const sndRes = snd({ state$, action$: fstRes.forward$, shutdown$ });
  return {
    forward$: sndRes.forward$,
    dispatch$: merge(fstRes.dispatch$, sndRes.dispatch$)
  };
};

export function createStore<State, Action>(
  initialState: State,
  reducer: Reducer<State, Action>,
  ...middleware: Array<Middleware<State, Action>>
): Readonly<Store<State, Action>> {
  const shutdown$ = new Subject<any>();
  const stateSubject$ = new BehaviorSubject<State>(initialState);
  const state$ = stateSubject$.asObservable().pipe(takeUntil(shutdown$));
  const actionSource$$ = new Subject<Obs<Action>>();
  const actionSource$ = actionSource$$.pipe(
    mergeMap(i => i),
    takeUntil(shutdown$)
  );
  const forwardActions: Middleware<State, Action> = ({ action$ }) => ({
    forward$: action$,
    dispatch$: emptyObs()
  });
  const actionProcessor = middleware.reduce(chainMiddleware, forwardActions);
  const shutdown = () => {
    shutdown$.next(true);
    shutdown$.complete();
  };
  const dispatch = (action: Action) => actionSource$$.next(obsFrom(action));
  const dispatchEpic = (epic: Epic<State, Action>) =>
    actionSource$$.next(epic({ state$, action$: actionSource$, shutdown$ }));
  const middlewareResult = actionProcessor({
    state$,
    action$: actionSource$,
    shutdown$
  });
  const updateState = middlewareResult.forward$
    .pipe(
      takeUntil(shutdown$),
      withLatestFrom(state$),
      map(([action, state]) => reducer(state, action))
    )
    .subscribe(n => stateSubject$.next(n));
  const dispatchMiddlewareActions = middlewareResult.dispatch$
    .pipe(takeUntil(shutdown$))
    .subscribe(n => dispatch(n));
  return {
    state$,
    dispatch,
    dispatchEpic,
    shutdown
  };
}
