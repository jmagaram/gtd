import { empty, interval, Observable as Obs, of as obsOf } from "rxjs";
import {
  delay,
  filter,
  flatMap,
  map,
  takeUntil,
  withLatestFrom
} from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import * as Store from "./stateStore";
import * as Option from "./utility/option";

interface AddAction {
  readonly kind: "add";
  readonly operand: number;
}

interface NegateAction {
  readonly kind: "negate";
}

type Action = AddAction | NegateAction;

const add = (operand: number): AddAction => ({ kind: "add", operand });

const negateAction: NegateAction = { kind: "negate" };

type MidWare = Store.ActionProcessor<number, Action>;

function reducer(state: number, action: Action) {
  switch (action.kind) {
    case "add":
      return action.operand + state;
    case "negate":
      return -state;
  }
}

const addNumberKey = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9
};

interface Configuration {
  initialState: number;
  add?: string;
  negate?: string;
  shutdown?: string;
  expected: string;
  expectedMap: {
    a?: number;
    b?: number;
    c?: number;
    d?: number;
    e?: number;
    f?: number;
    g?: number;
    h?: number;
    i?: number;
    j?: number;
    k?: number;
  };
  middleware?: MidWare[];
}

function genericStoreTest(c: Configuration) {
  const sch = new TestScheduler((act, exp) => expect(act).toEqual(exp));
  sch.run(({ hot }) => {
    const store = Store.create<number, Action>(
      c.initialState,
      reducer,
      ...Option.reduce(c.middleware, [])
    );
    if (c.add !== undefined) {
      hot<number>(c.add, addNumberKey)
        .pipe(map(i => store.dispatch(add(i))))
        .subscribe();
    }
    if (c.negate !== undefined) {
      hot(c.negate)
        .pipe(map(() => store.dispatch(negateAction)))
        .subscribe();
    }
    if (c.shutdown !== undefined) {
      hot(c.shutdown)
        .pipe(map(() => store.shutdown()))
        .subscribe();
    }
    sch.expectObservable(store.state$).toBe(c.expected, c.expectedMap);
  });
}

test("state$ - when subscribe before any action is dispatched, get the initial state", () => {
  const c: Configuration = {
    initialState: 100,
    add: "--------^--------",
    expected: "a--------",
    expectedMap: {
      a: 100
    }
  };
  genericStoreTest(c);
});

test("state$ - when subscribe after actions have been dispatched, get the current state", () => {
  const c: Configuration = {
    initialState: 100,
    add: "--1---3--^----------",
    expected: "a----",
    expectedMap: {
      a: 104
    }
  };
  genericStoreTest(c);
});

test("state$ - when each action is processed, update and emit the new state", () => {
  const c: Configuration = {
    initialState: 0,
    add: "--1---3--8--2--8",
    negate: "----x------x----",
    expected: "a-b-c-d--e-fg--h",
    expectedMap: {
      a: 0,
      b: 1,
      c: -1,
      d: 2,
      e: 10,
      f: -10,
      g: -8,
      h: 0
    }
  };
  genericStoreTest(c);
});

test("state$ - on shutdown, emit completed", () => {
  const c: Configuration = {
    initialState: 0,
    add: "--1---3--8--2--8",
    shutdown: "--------x-------",
    expected: "a-b---c-|",
    expectedMap: {
      a: 0,
      b: 1,
      c: 4
    }
  };
  genericStoreTest(c);
});

test("dispatch observable", () => {
  const store = Store.create(0, reducer);
  const process = (context: {
    action$: Obs<Action>;
    state$: Obs<number>;
    shutdown$: Obs<any>;
  }) =>
    interval(3).pipe(
      map(i => add(2)),
      takeUntil(context.action$.pipe(filter(i => i.kind === "negate")))
    );
  const sch = new TestScheduler((a, e) => expect(a).toEqual(e));
  sch.run(({ hot }) => {
    store.dispatchObservable(process);
    hot("-------------x")
      .pipe(map(i => store.dispatch(negateAction)))
      .subscribe();
    sch
      .expectObservable(store.state$)
      .toBe("a--b--c--d--ef-----", { a: 0, b: 2, c: 4, d: 6, e: 8, f: -8 });
    // "---------x"
    // "---x--x--x--x--x--x--x" adding
    // "-------------x" negate
    // "a--b--c--d--e-f-----" expected
  });
});

test("middleware can filter actions that get forwarded", () => {
  const filterNegate: MidWare = ({ action$: a$ }) => ({
    forward$: a$.pipe(filter(i => i.kind === "add")),
    dispatch$: empty()
  });
  const c: Configuration = {
    add: "--1---3--^--2--8----",
    expected: "a--b--c----",
    expectedMap: {
      a: 4,
      b: 6,
      c: 14
    },
    initialState: 0,
    middleware: [filterNegate]
  };
  genericStoreTest(c);
});

test("middleware can dispatch new delayed actions based on state$", () => {
  const dispatchAddFiveWhenStateIsTen: MidWare = ({
    action$: a$,
    state$: s$
  }) => ({
    dispatch$: s$.pipe(filter(s => s === 10), delay(1), map(_ => add(5))),
    forward$: a$
  });
  // prettier-ignore
  const c: Configuration = {
    initialState: 0,
    add:      "-2-2-6--7",
    expected: "ab-c-de-f",
    expectedMap: {
      a: 0,
      b: 2,
      c: 4,
      d: 10,
      e: 15,
      f: 22
    },
    middleware: [dispatchAddFiveWhenStateIsTen]
  };
  genericStoreTest(c);
});

test("middleware can dispatch new synchronous actions based on state$", () => {
  const dispatchAddFiveWhenStateIsTen: MidWare = ({
    action$: a$,
    state$: s$
  }) => ({
    dispatch$: s$.pipe(filter(s => s === 10), map(_ => add(5))),
    forward$: a$
  });
  // prettier-ignore
  const c: Configuration = {
    initialState: 0,
    add:      "-2---2-6-------7",
    expected: "ab---c-(de)----f",
    expectedMap: {
      a: 0,
      b: 2,
      c: 4,
      d: 10,
      e: 15,
      f: 22
    },
    middleware: [dispatchAddFiveWhenStateIsTen]
  };
  genericStoreTest(c);
});

test("middleware can dispatch new actions based on current state", () => {
  const dispatchAddFiveWhenStateIsEven: MidWare = ({
    state$: s$,
    action$: a$
  }) => ({
    dispatch$: a$.pipe(
      withLatestFrom(s$),
      filter(([_, state]) => state % 2 === 0),
      map(_ => add(5))
    ),
    forward$: a$
  });
  const c: Configuration = {
    add: "--0---1------1------",
    expected: "a-b---(cd)---(ef)---",
    expectedMap: {
      a: 1,
      b: 1,
      c: 2,
      d: 7,
      e: 8,
      f: 13
    },
    initialState: 1,
    middleware: [dispatchAddFiveWhenStateIsEven]
  };
  genericStoreTest(c);
});

test("middleware can change and forward new actions", () => {
  const transform: MidWare = ({ action$: a$ }) => ({
    forward$: a$.pipe(
      flatMap(
        i =>
          i.kind === "add" ? obsOf(negateAction, add(i.operand * 3)) : obsOf(i)
      )
    ),
    dispatch$: empty()
  });
  // prettier-ignore
  const c: Configuration = {
      add:      "--5-----7-------------",
      expected: "a-(bc)--(de)-----",
      initialState: 1,
      expectedMap: {
      a: 1,
      b: -1,
      c: 14,
      d: -14,
      e: 7,
    },
    middleware: [transform]
  };
  genericStoreTest(c);
});

test("middleware chain is processed in correct order", () => {
  const incrementOperand: MidWare = ({ action$: a$ }) => ({
    forward$: a$.pipe(
      flatMap(i => (i.kind === "add" ? obsOf(add(i.operand + 1)) : obsOf(i)))
    ),
    dispatch$: empty()
  });
  const multiplyOperandByFive: MidWare = ({ action$: a$ }) => ({
    forward$: a$.pipe(
      flatMap(i => (i.kind === "add" ? obsOf(add(i.operand * 5)) : obsOf(i)))
    ),
    dispatch$: empty()
  });
  // prettier-ignore
  const c: Configuration = {
      add:      "--1---2-----3-------",
      expected: "a-b---c-----d-------",
      initialState: 0,
      expectedMap: {
      a: 0,
      b: 10,
      c: 25,
      d: 45,
    },
    middleware: [incrementOperand,multiplyOperandByFive]
  };
  genericStoreTest(c);
});

test("can dispatch an action stream", () => {
  const sch = new TestScheduler((act, exp) => expect(act).toEqual(exp));
  sch.run(({ hot }) => {
    const store = Store.create<number, Action>(0, reducer);
    const marbles = {
      addThree: "--x--x--x--|",
      expected: "a-b--c--d"
    };
    const expectedMap = { a: 0, b: 3, c: 6, d: 9 };
    const action$ = hot(marbles.addThree).pipe(map(() => add(3)));
    store.dispatchStream(action$);
    sch.expectObservable(store.state$).toBe(marbles.expected, expectedMap);
  });
});

// test("can dispatch more than one overlapping stream, even after first completes", () => {
//   const sch = new TestScheduler((act, exp) => expect(act).toEqual(exp));
//   sch.run(({ cold }) => {
//     const store = Store.create<number, Action>(0, reducer);
//     const marbles = {
//       addActions: "1--5--9-|",
//       dispatchOn: "-x-x---------x---------",
//       expected: "ab-cd-ef-g---h--i--j"
//     };
//     const expectedMap = {
//       a: 0,
//       b: 1,
//       c: 2,
//       d: 7,
//       e: 12,
//       f: 21,
//       g: 30,
//       h: 31,
//       i: 36,
//       j: 45
//     };
//     const actionsToDispatch$ = cold<number>(
//       marbles.addActions,
//       addNumberKey
//     ).pipe(map(i => add(i)));
//     sch.expectObservable(store.state$).toBe(marbles.expected, expectedMap);
//   });
// });

// when dispatch stream, subscribe to it once

// test("shutdown unsubscribes from dispatched action streams", () => {
//   const sch = new TestScheduler((act, exp) => expect(act).toEqual(exp));
//   sch.run(({ hot, cold }) => {
//     const store = Store.create<number, Action>(0, reducer);
//     const marbles = {
//       shutdown: "----x",
//       addThree: "-x-----xxxxx",
//       expected: "ab--|",
//       expdissub: "^---!"
//     };
//     const timedShutdown$ = cold(marbles.shutdown)
//       .pipe(map(i => store.shutdown()))
//       .subscribe();
//     const toDispatch$ = cold(marbles.addThree);
//     store.dispatchStream(toDispatch$.pipe(map(i => add(3)))); // start at 0
//     sch.expectObservable(store.state$).toBe(marbles.expected, { a: 0, b: 3 });
//     sch.expectSubscriptions(toDispatch$.subscriptions).toBe(marbles.expdissub);
//   });
// });

// sends completed to middleware using state and action streams
