import { of as obsOf } from "rxjs";
import { filter, flatMap, map, take, withLatestFrom } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import * as Store from "./stateStore";
import { Middleware } from "./stateStore";
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

type MidWare = Store.Middleware<number, Action>;

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
  addMarbles: string;
  negateMarbles?: string;
  expectedMarbles: string;
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
  middleware?: Array<Middleware<number, Action>>;
}

function genericStoreTest(c: Configuration) {
  const sch = new TestScheduler((act, exp) => expect(act).toEqual(exp));
  sch.run(({ hot }) => {
    const store = Store.create<number, Action>(
      c.initialState,
      reducer,
      ...Option.reduce(c.middleware, [])
    );
    hot<number>(c.addMarbles, addNumberKey)
      .pipe(map(i => store.dispatch(add(i))))
      .subscribe();
    if (c.negateMarbles !== undefined) {
      hot(c.negateMarbles)
        .pipe(map(() => store.dispatch(negateAction)))
        .subscribe();
    }
    sch.expectObservable(store.state$).toBe(c.expectedMarbles, c.expectedMap);
  });
}

test("when subscribe before any dispatched actions, emit the initial state", () => {
  const c: Configuration = {
    addMarbles: "--------^--------",
    negateMarbles: "--------^--------",
    expectedMarbles: "a--------",
    expectedMap: {
      a: 99
    },
    initialState: 99
  };
  genericStoreTest(c);
});

test("when subscribe after actions dispatched, can still get the current state", () => {
  const c: Configuration = {
    addMarbles: "--1---3--^--2--8----",
    negateMarbles: "----x----^--------x-",
    expectedMarbles: "a--b--c--d-",
    expectedMap: {
      a: 2,
      b: 4,
      c: 12,
      d: -12
    },
    initialState: 0
  };
  genericStoreTest(c);
});

test("middleware can filter out actions", () => {
  const filterNegate: MidWare = (s$, a$) =>
    a$.pipe(filter(i => i.message.kind === "add"));
  const c: Configuration = {
    addMarbles: "--1---3--^--2--8----",
    expectedMarbles: "a--b--c----",
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

test("middleware can dispatch new actions based on current state", () => {
  const dispatchAddFiveWhenStateIsEven: MidWare = (s$, a$) =>
    a$.pipe(
      withLatestFrom(s$),
      flatMap(i =>
        obsOf(i[0], Store.send(add(5))).pipe(take(i[1] % 2 === 0 ? 2 : 1))
      )
    );
  const c: Configuration = {
    addMarbles: "--0---1------1------",
    expectedMarbles: "a-b---(cd)---(ef)---",
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
  const transform: MidWare = (s$, a$) =>
    a$.pipe(
      flatMap(
        i =>
          i.message.kind === "add"
            ? obsOf(
                Store.forward(negateAction),
                Store.forward(add(i.message.operand * 3))
              )
            : obsOf(i)
      )
    );
  // prettier-ignore
  const c: Configuration = {
      addMarbles:      "--5-----7-------------",
      expectedMarbles: "a-(bc)--(de)-----",
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
  const incrementOperand: MidWare = (s$, a$) =>
    a$.pipe(
      map(
        i =>
          i.message.kind === "add"
            ? Store.forward(add(i.message.operand + 1))
            : i
      )
    );
  const multiplyOperandByFive: MidWare = (s$, a$) =>
    a$.pipe(
      map(
        i =>
          i.message.kind === "add"
            ? Store.forward(add(i.message.operand * 5))
            : i
      )
    );
  // prettier-ignore
  const c: Configuration = {
      addMarbles:      "--1---2-----3-------",
      expectedMarbles: "a-b---c-----d-------",
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

test("can dispatch more than one overlapping stream, even after first completes", () => {
  const sch = new TestScheduler((act, exp) => expect(act).toEqual(exp));
  sch.run(({ hot, cold }) => {
    const store = Store.create<number, Action>(0, reducer);
    const marbles = {
      addActions: "1--5--9-|",
      dispatchOn: "-x-x---------x---------",
      expected: "ab-cd-ef-g---h--i--j"
    };
    const expectedMap = {
      a: 0,
      b: 1,
      c: 2,
      d: 7,
      e: 12,
      f: 21,
      g: 30,
      h: 31,
      i: 36,
      j: 45
    };
    const actionsToDispatch$ = cold<number>(
      marbles.addActions,
      addNumberKey
    ).pipe(map(i => add(i)));
    const timedDispatch$ = cold(marbles.dispatchOn)
      .pipe(map(i => store.dispatchStream(actionsToDispatch$)))
      .subscribe();
    sch.expectObservable(store.state$).toBe(marbles.expected, expectedMap);
  });
});
