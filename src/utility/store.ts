import {
  BehaviorSubject,
  empty as emptyObs,
  merge,
  Observable as Obs,
  of as obsFrom,
  Subject
} from "rxjs";
import { map, mergeMap, takeUntil, withLatestFrom } from "rxjs/operators";

/**
 * An application state store, like Redux, but based on Observables and rxjs.
 */
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

/**
 * A function that processes actions as they flow through the store, from the beginning when they
 * are dispatched until they are used to reduce the state. Similar to middleware in Redux but based on rxjs
 * observables. Each function in the chain can inspect the action and state streams, and returns an
 * object indicating actions that should be forwarded and dispatched anew.
 *
 * @param state$ The current store state.
 * @param action$ The action stream, filtered by any prior middleware.
 * @param shutdown$ Emits a single value when the store is shutdown; use with the rxjs takeUntil operator
 * on any subscriptions.
 */
export type Middleware<State, Action> = (
  { state$, action$, shutdown$ }: Context<State, Action>
) => {
  forward$: Obs<Action>;
  dispatch$: Obs<Action>;
};

/**
 * Can be used to submit an observable of actions to the store. The behavior of the observable can be
 * customized based on subsequent actions and store state. For example, an Epic could initiate a
 * delayed deletion operation that could be cancelled if a cancellation action arrives.
 */
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
  const forwardOnly: Middleware<State, Action> = ({ action$ }) => ({
    forward$: action$,
    dispatch$: emptyObs()
  });
  const appliedMiddleware = middleware.reduce(chainMiddleware, forwardOnly);
  const shutdown = () => {
    shutdown$.next(true);
    shutdown$.complete();
  };
  const dispatch = (action: Action) => actionSource$$.next(obsFrom(action));
  const dispatchEpic = (epic: Epic<State, Action>) =>
    actionSource$$.next(epic({ state$, action$: actionSource$, shutdown$ }));
  const { forward$, dispatch$ } = appliedMiddleware({
    state$,
    action$: actionSource$,
    shutdown$
  });
  const updateState = forward$
    .pipe(
      takeUntil(shutdown$),
      withLatestFrom(state$),
      map(([action, state]) => reducer(state, action))
    )
    .subscribe(stateSubject$);
  const dispatchMiddlewareActions = dispatch$
    .pipe(takeUntil(shutdown$))
    .subscribe(n => dispatch(n));
  return {
    state$,
    dispatch,
    dispatchEpic,
    shutdown
  };
}
