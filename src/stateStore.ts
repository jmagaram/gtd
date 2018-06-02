import {
  BehaviorSubject,
  Observable as Obs,
  of as observableOf,
  Subject
} from "rxjs";
import {
  filter,
  map,
  mergeMap,
  takeUntil,
  withLatestFrom
} from "rxjs/operators";

type Process<State, Action> = (
  context: { action$: Obs<Action>; state$: Obs<State>; shutdown$: Obs<any> }
) => Obs<Action>;

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

export enum Destination {
  dispatcher,
  forward
}

interface Envelope<T> {
  message: T;
  destination: Destination;
}

const createEnvelope = <T>(
  message: T,
  destination: Destination
): Envelope<T> => {
  return {
    message,
    destination
  };
};

export const send = <T>(message: T) =>
  createEnvelope(message, Destination.dispatcher);

export const forward = <T>(message: T) =>
  createEnvelope(message, Destination.forward);

export type Middleware<State, Action> = (
  state$: Obs<State>,
  action$: Obs<Envelope<Action>>
) => Obs<Envelope<Action>>;

export type Reducer<State, Action> = (
  previousState: State,
  action: Action
) => State;

export function create<State, Action>(
  initialState: State,
  reducer: Reducer<State, Action>,
  ...middleware: Array<Middleware<State, Action>>
): Store<State, Action> {
  const state$ = new BehaviorSubject<State>(initialState);
  const shutdown$ = new Subject<any>();
  const actionSource$$ = new Subject<Obs<Action>>();
  const actionSource$ = actionSource$$.pipe(
    mergeMap(i => i),
    takeUntil(shutdown$)
  );
  const passThroughMiddleware: Middleware<State, Action> = (
    s$: Obs<State>,
    a$: Obs<Envelope<Action>>
  ) => a$;
  type MidWare = Middleware<State, Action>;
  const combineTwoMiddleWare = (fst: MidWare, snd: MidWare): MidWare => (
    s$: Obs<State>,
    a$: Obs<Envelope<Action>>
  ) => snd(s$, fst(s$, a$));
  const combineAllMiddleware: MidWare = middleware.reduce(
    combineTwoMiddleWare,
    passThroughMiddleware
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
  const actionsAfterMiddleware$ = combineAllMiddleware(
    state$,
    actionSource$.pipe(map(i => forward(i)))
  ); // publish?
  actionsAfterMiddleware$
    .pipe(
      filter(i => i.destination === Destination.forward),
      withLatestFrom(state$)
    )
    .subscribe(i => state$.next(reducer(i[1], i[0].message)));
  actionsAfterMiddleware$
    .pipe(
      filter(i => i.destination === Destination.dispatcher),
      map(i => i.message)
    )
    .subscribe(j => dispatch(j));
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
