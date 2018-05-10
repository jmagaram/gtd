import * as Store from './stateStore';

interface AddAction {
    readonly kind: "add",
    readonly operand: number
};

interface NegateAction {
    readonly kind: "negate"
}

type Action = AddAction | NegateAction;

function reducer(state: number, action: Action) {
    switch (action.kind) {
        case "add": return action.operand + state;
        case "negate": return -state;
    }
}

test("when subscribe before any dispatched actions, emit the initial state", () => {
    const initialState = 1;
    const store = Store.create<number, Action>(initialState, reducer);
    let lastPublished: number = -1;
    const subscription = store.state$.subscribe(n => {
        lastPublished = n;
    });
    expect(lastPublished).toBe(1);
    subscription.unsubscribe();
});

test("when actions are dispatched, emit the new calculated state", () => {
    const initialState = 1;
    const store = Store.create<number, Action>(initialState, reducer);
    let lastItem: number = -1;
    const subscription = store.state$.subscribe(n => {
        lastItem = n;
    });

    store.dispatch({ kind: "add", operand: 10 });
    expect(lastItem).toBe(11);

    store.dispatch({ kind: "add", operand: 5 });
    expect(lastItem).toBe(16);

    store.dispatch({ kind: "negate" });
    expect(lastItem).toBe(-16);

    subscription.unsubscribe();
});