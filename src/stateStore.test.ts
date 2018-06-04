import { empty, interval, Observable as Obs, of as obsOf, Subject } from "rxjs";
import { delay, filter, map, mergeMap, take } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { createAction } from "../src/reactUtility/action";
import * as Store from "./stateStore";
import * as Option from "./utility/option";
import { createSecureContext } from "tls";

const append = (s: string) => createAction("append", s);

type AppendAction = ReturnType<typeof append>;

const reducer = (state: string, action: AppendAction) => state + action.payload;

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
  middleware?: Array<Store.ActionProcessor<string, AppendAction>>;
}

const whenStateIsXDispatchY = (
  state: string,
  dispatch: Obs<AppendAction>
): Store.ActionProcessor<string, AppendAction> => ({ state$, action$ }) => ({
  forward$: action$,
  dispatch$: state$.pipe(filter(i => i === state), mergeMap(_ => dispatch))
});

const whenActionIsXDispatchY = (
  findAction: string,
  dispatch: Obs<AppendAction>
): Store.ActionProcessor<string, AppendAction> => ({ state$, action$ }) => ({
  forward$: action$,
  dispatch$: action$.pipe(
    filter(i => i.payload === findAction),
    mergeMap(_ => dispatch)
  )
});

const whenActionIsXReplaceWithY = (
  findAction: string,
  replace: Obs<AppendAction>
): Store.ActionProcessor<string, AppendAction> => ({ state$, action$ }) => ({
  forward$: action$.pipe(
    mergeMap(i => (i.payload === findAction ? replace : obsOf(i)))
  ),
  dispatch$: empty()
});

const createTestScheduler = () =>
  new TestScheduler((act, exp) => expect(act).toEqual(exp));

function genericTest(cfg: Configuration) {
  const sch = createTestScheduler();
  sch.run(({ hot }) => {
    const store = Store.create(
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
  genericTest(c);
});

test("state$ - when subscribe after actions have been dispatched, get the current state", () => {
  const c: Configuration = {
    append: "--a---b--^----------",
    expected: "A----",
    expectedMap: {
      A: "ab"
    }
  };
  genericTest(c);
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
  genericTest(c);
});

test("dispatchObservable - when each action is processed, reduce and emit state$", () => {
  const sch = createTestScheduler();
  sch.run(({ hot, cold }) => {
    const store = Store.create("", reducer);
    const process = ({  }: Store.Context<string, AppendAction>) =>
      cold("-x--x|").pipe(map(_ => append("a")));
    hot("--x-----x")
      .pipe(map(_ => store.dispatchObservable(process)))
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
      whenStateIsXDispatchY("a", obsOf(append("y")).pipe(delay(1))),
      whenStateIsXDispatchY("ayb", obsOf(append("z")).pipe(delay(1)))
    ]
  };
  genericTest(c);
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
      whenActionIsXDispatchY("a", obsOf(append("y")).pipe(delay(1))),
      whenActionIsXDispatchY("b", obsOf(append("z")).pipe(delay(1)))
    ]
  };
  genericTest(c);
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
      whenActionIsXReplaceWithY("a", obsOf(append("y")).pipe(delay(1))),
      whenActionIsXReplaceWithY("b", obsOf(append("z")).pipe(delay(1)))
    ]
  };
  genericTest(c);
});

test("middleware - function executed only once", () => {
  let executeCount = 0;
  const spy: Store.ActionProcessor<string, AppendAction> = ({
    action$,
    shutdown$
  }) => {
    executeCount++;
    return {
      forward$: action$,
      dispatch$: empty()
    };
  };
  const store = Store.create("", reducer, spy);
  const sch = createTestScheduler();
  sch.run(({ hot }) => {
    store.dispatch(append("a"));
    store.dispatch(append("b"));
    expect(executeCount).toBe(1);
  });
});

test("middleware can generate dispatches regardless of state and actions", () => {
  const emitRegularly = (
    action: AppendAction,
    everyMilliseconds: number,
    takeCount: number
  ) => ({ action$ }: Store.Context<string, AppendAction>) => ({
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
  genericTest(c);
});

test("middleware reduces each action before dispatching new actions dispatched by middleware", () => {
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
      whenActionIsXDispatchY("a", obsOf(append("y"))),
      whenActionIsXDispatchY("b", obsOf(append("z")))
    ]
  };
  genericTest(c);
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
  genericTest(c);
});

test("shutdown - shutdown$ provided to middleware emits something then completes", () => {
  let shutdown: Obs<any>;
  const spy: Store.ActionProcessor<string, AppendAction> = ({
    action$,
    shutdown$
  }) => {
    shutdown = shutdown$;
    return {
      forward$: action$,
      dispatch$: empty()
    };
  };
  const store = Store.create("", reducer, spy);
  const sch = createTestScheduler();
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
  const spy: Store.ActionProcessor<string, AppendAction> = ({
    action$,
    state$
  }) => {
    spyState$ = state$;
    return {
      forward$: action$,
      dispatch$: empty()
    };
  };
  const store = Store.create("", reducer, spy);
  const sch = createTestScheduler();
  sch.run(({ hot }) => {
    hot("----x")
      .pipe(map(_ => store.shutdown()))
      .subscribe();
    sch.expectObservable(spyState$).toBe("A---|", { A: "" });
  });
});

test("shutdown - action$ provided to middleware completes", () => {
  let spyAction$: Obs<AppendAction>;
  const spy: Store.ActionProcessor<string, AppendAction> = ({
    action$,
    state$
  }) => {
    spyAction$ = action$;
    return {
      forward$: action$,
      dispatch$: empty()
    };
  };
  const store = Store.create("", reducer, spy);
  const sch = createTestScheduler();
  sch.run(({ hot }) => {
    hot("----x")
      .pipe(map(_ => store.shutdown()))
      .subscribe();
    sch.expectObservable(spyAction$).toBe("----|");
  });
});

test("shutdown - unsubscribe from middleware dispatch$", () => {
  const sch = createTestScheduler();
  sch.run(({ hot }) => {
    const dispatch = hot("");
    const processor = ({
      action$,
      state$
    }: Store.Context<string, AppendAction>) => ({
      forward$: action$,
      dispatch$: dispatch
    });
    const target = Store.create("", reducer, processor);
    hot("-----x")
      .pipe(map(i => target.shutdown()))
      .subscribe();
    sch.expectSubscriptions(dispatch.subscriptions).toBe("^----!");
  });
});

test("shutdown - unsubscribe from middleware forward$", () => {
  const sch = createTestScheduler();
  sch.run(({ hot }) => {
    const forward = hot("");
    const processor = ({
      action$,
      state$
    }: Store.Context<string, AppendAction>) => ({
      forward$: forward,
      dispatch$: empty()
    });
    const target = Store.create("", reducer, processor);
    hot("-----x")
      .pipe(map(i => target.shutdown()))
      .subscribe();
    sch.expectSubscriptions(forward.subscriptions).toBe("^----!");
  });
});
