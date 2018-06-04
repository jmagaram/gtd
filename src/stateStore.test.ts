import {
  empty as emptyObs,
  interval,
  Observable as Obs,
  of as obsFrom
} from "rxjs";
import { delay, filter, map, mergeMap, take } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { createAction } from "../src/reactUtility/action";
import * as Store from "./stateStore";
import * as Option from "./utility/option";

const append = (s: string) => createAction("append", s);

type Append = ReturnType<typeof append>;

const reducer = (state: string, action: Append) => state + action.payload;

const letterKey = {
  a: "a",
  b: "b",
  c: "c",
  d: "d",
  e: "e",
  f: "f",
  g: "g",
  h: "h",
  i: "i",
  j: "j",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "p"
};

interface Configuration {
  append: string;
  shutdown?: string;
  expected: string;
  expectedMap: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
    E?: string;
    F?: string;
    G?: string;
    H?: string;
    I?: string;
    J?: string;
    K?: string;
  };
  middleware?: Array<Store.Middleware<string, Append>>;
}

const whenStateIsXDispatchY = (
  state: string,
  dispatch: Obs<Append>
): Store.Middleware<string, Append> => ({ state$, action$ }) => ({
  forward$: action$,
  dispatch$: state$.pipe(filter(i => i === state), mergeMap(_ => dispatch))
});

const whenActionIsXDispatchY = (
  findAction: string,
  dispatch: Obs<Append>
): Store.Middleware<string, Append> => ({ state$, action$ }) => ({
  forward$: action$,
  dispatch$: action$.pipe(
    filter(i => i.payload === findAction),
    mergeMap(_ => dispatch)
  )
});

const whenActionIsXReplaceWithY = (
  findAction: string,
  replace: Obs<Append>
): Store.Middleware<string, Append> => ({ state$, action$ }) => ({
  forward$: action$.pipe(
    mergeMap(i => (i.payload === findAction ? replace : obsFrom(i)))
  ),
  dispatch$: emptyObs()
});

const testScheduler = () =>
  new TestScheduler((act, exp) => expect(act).toEqual(exp));

function runGenericTest(cfg: Configuration) {
  const sch = testScheduler();
  sch.run(({ hot }) => {
    const store = Store.createStore(
      "",
      reducer,
      ...Option.reduce(cfg.middleware, [])
    );
    hot<string>(cfg.append, letterKey)
      .pipe(map(i => store.dispatch(append(i))))
      .subscribe();
    if (cfg.shutdown !== undefined) {
      hot(cfg.shutdown)
        .pipe(map(() => store.shutdown()))
        .subscribe();
    }
    sch.expectObservable(store.state$).toBe(cfg.expected, cfg.expectedMap);
  });
}

test("state$ - when subscribe before any action is dispatched, get the initial state", () => {
  const c: Configuration = {
    append: "--------^--------",
    expected: "A--------",
    expectedMap: {
      A: ""
    }
  };
  runGenericTest(c);
});

test("state$ - when subscribe after actions have been dispatched, get the current state", () => {
  const c: Configuration = {
    append: "--a---b--^----------",
    expected: "A----",
    expectedMap: {
      A: "ab"
    }
  };
  runGenericTest(c);
});

test("dispatchAction - when each action is processed, reduce and emit state$", () => {
  const c: Configuration = {
    append: "--a---b--c--d--e",
    expected: "A-B---C--D--E--F",
    expectedMap: {
      A: "",
      B: "a",
      C: "ab",
      D: "abc",
      E: "abcd",
      F: "abcde"
    }
  };
  runGenericTest(c);
});

test("dispatchEpic - when each action is processed, reduce and emit state$", () => {
  const sch = testScheduler();
  sch.run(({ hot, cold }) => {
    const store = Store.createStore("", reducer);
    const epic = ({  }: Store.Context<string, Append>) =>
      cold("-x--x|").pipe(map(_ => append("a")));
    hot("--x-----x")
      .pipe(map(_ => store.dispatchEpic(epic)))
      .subscribe();
    sch.expectObservable(store.state$).toBe("A--B--C--D--E", {
      A: "",
      B: "a",
      C: "aa",
      D: "aaa",
      E: "aaaa"
    });
  });
});

test("middleware can dispatch actions based on current state", () => {
  const c: Configuration = {
    // prettier-ignore
    append:   "--a---b--",
    expected: "A-BC--DE",
    expectedMap: {
      A: "",
      B: "a",
      C: "ay",
      D: "ayb",
      E: "aybz"
    },
    middleware: [
      whenStateIsXDispatchY("a", obsFrom(append("y")).pipe(delay(1))),
      whenStateIsXDispatchY("ayb", obsFrom(append("z")).pipe(delay(1)))
    ]
  };
  runGenericTest(c);
});

test("middleware can dispatch actions based on actions", () => {
  const c: Configuration = {
    // prettier-ignore
    append:   "--a---b--",
    expected: "A-BC--DE",
    expectedMap: {
      A: "",
      B: "a",
      C: "ay",
      D: "ayb",
      E: "aybz"
    },
    middleware: [
      whenActionIsXDispatchY("a", obsFrom(append("y")).pipe(delay(1))),
      whenActionIsXDispatchY("b", obsFrom(append("z")).pipe(delay(1)))
    ]
  };
  runGenericTest(c);
});

test("middleware can filter and replace actions that get forwarded", () => {
  const c: Configuration = {
    // prettier-ignore
    append:   "--a---b--",
    expected: "A--B---C",
    expectedMap: {
      A: "",
      B: "y",
      C: "yz"
    },
    middleware: [
      whenActionIsXReplaceWithY("a", obsFrom(append("y")).pipe(delay(1))),
      whenActionIsXReplaceWithY("b", obsFrom(append("z")).pipe(delay(1)))
    ]
  };
  runGenericTest(c);
});

test("middleware customizes actions going to next middleware in chain", () => {
  const c: Configuration = {
    // prettier-ignore
    append:   "--a---a--",
    expected: "A---B---C",
    expectedMap: {
      A: "",
      B: "c",
      C: "cc"
    },
    middleware: [
      whenActionIsXReplaceWithY("a", obsFrom(append("b")).pipe(delay(1))),
      whenActionIsXReplaceWithY("b", obsFrom(append("c")).pipe(delay(1)))
    ]
  };
  runGenericTest(c);
});

test("middleware function executed only once", () => {
  let executeCount = 0;
  const spy: Store.Middleware<string, Append> = ({ action$, shutdown$ }) => {
    executeCount++;
    return {
      forward$: action$,
      dispatch$: emptyObs()
    };
  };
  const store = Store.createStore("", reducer, spy);
  const sch = testScheduler();
  sch.run(({ hot }) => {
    store.dispatch(append("a"));
    store.dispatch(append("b"));
    expect(executeCount).toBe(1);
  });
});

test("middleware can generate dispatches regardless of state and actions", () => {
  const emitRegularly = (
    action: Append,
    everyMilliseconds: number,
    takeCount: number
  ) => ({ action$ }: Store.Context<string, Append>) => ({
    forward$: action$,
    dispatch$: interval(everyMilliseconds).pipe(
      take(takeCount),
      map(_ => action)
    )
  });
  const c: Configuration = {
    // prettier-ignore
    append:   "-----------",
    expected: "ABCDEF-----",
    expectedMap: {
      A: "",
      B: "a",
      C: "aa",
      D: "aaa",
      E: "aaaa",
      F: "aaaaa"
    },
    middleware: [emitRegularly(append("a"), 1, 5)]
  };
  runGenericTest(c);
});

test("middleware reduces each action before dispatching new actions", () => {
  const c: Configuration = {
    // prettier-ignore
    append:   "---a------b",
    expected: "A--(BC)---(DE)",
    expectedMap: {
      A: "",
      B: "a",
      C: "ay",
      D: "ayb",
      E: "aybz"
    },
    middleware: [
      whenActionIsXDispatchY("a", obsFrom(append("y"))),
      whenActionIsXDispatchY("b", obsFrom(append("z")))
    ]
  };
  runGenericTest(c);
});

test("shutdown - state$ completes", () => {
  const c: Configuration = {
    // prettier-ignore
    append:    "--a---b----c---c-",
    shutdown: "--------x--------",
    expected: "A-B---C-|------- ",
    expectedMap: {
      A: "",
      B: "a",
      C: "ab"
    }
  };
  runGenericTest(c);
});

test("shutdown - shutdown$ provided to middleware emits something then completes", () => {
  let shutdown: Obs<any>;
  const spy: Store.Middleware<string, Append> = ({ action$, shutdown$ }) => {
    shutdown = shutdown$;
    return {
      forward$: action$,
      dispatch$: emptyObs()
    };
  };
  const store = Store.createStore("", reducer, spy);
  const sch = testScheduler();
  sch.run(({ hot }) => {
    hot("----x")
      .pipe(map(_ => store.shutdown()))
      .subscribe();
    sch
      .expectObservable(shutdown.pipe(map(_ => "x")))
      .toBe("----(x|)", { x: "x" });
  });
});

test("shutdown - state$ provided to middleware completes", () => {
  let spyState$: Obs<string>;
  const spy: Store.Middleware<string, Append> = ({ action$, state$ }) => {
    spyState$ = state$;
    return {
      forward$: action$,
      dispatch$: emptyObs()
    };
  };
  const store = Store.createStore("", reducer, spy);
  const sch = testScheduler();
  sch.run(({ hot }) => {
    hot("----x")
      .pipe(map(_ => store.shutdown()))
      .subscribe();
    sch.expectObservable(spyState$).toBe("A---|", { A: "" });
  });
});

test("shutdown - action$ provided to middleware completes", () => {
  let spyAction$: Obs<Append>;
  const spy: Store.Middleware<string, Append> = ({ action$, state$ }) => {
    spyAction$ = action$;
    return {
      forward$: action$,
      dispatch$: emptyObs()
    };
  };
  const store = Store.createStore("", reducer, spy);
  const sch = testScheduler();
  sch.run(({ hot }) => {
    hot("----x")
      .pipe(map(_ => store.shutdown()))
      .subscribe();
    sch.expectObservable(spyAction$).toBe("----|");
  });
});

test("shutdown - unsubscribe from middleware dispatch$", () => {
  const sch = testScheduler();
  sch.run(({ hot }) => {
    const dispatch = hot("");
    const processor = ({ action$, state$ }: Store.Context<string, Append>) => ({
      forward$: action$,
      dispatch$: dispatch
    });
    const target = Store.createStore("", reducer, processor);
    hot("-----x")
      .pipe(map(i => target.shutdown()))
      .subscribe();
    sch.expectSubscriptions(dispatch.subscriptions).toBe("^----!");
  });
});

test("shutdown - unsubscribe from middleware forward$", () => {
  const sch = testScheduler();
  sch.run(({ hot }) => {
    const forward = hot("");
    const processor = ({ action$, state$ }: Store.Context<string, Append>) => ({
      forward$: forward,
      dispatch$: emptyObs()
    });
    const target = Store.createStore("", reducer, processor);
    hot("-----x")
      .pipe(map(i => target.shutdown()))
      .subscribe();
    sch.expectSubscriptions(forward.subscriptions).toBe("^----!");
  });
});

test("shutdown - unsubscribe from dispatched epic", () => {
  const sch = testScheduler();
  sch.run(({ hot }) => {
    const epic$ = hot("-----x-----x");
    const epic: Store.Epic<string, Append> = ({ state$ }) =>
      epic$.pipe(map(_ => append("a")));
    const target = Store.createStore("", reducer);
    target.dispatchEpic(epic);
    hot("-----x")
      .pipe(map(i => target.shutdown()))
      .subscribe();
    sch.expectSubscriptions(epic$.subscriptions).toBe("^----!");
  });
});
