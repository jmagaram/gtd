import * as Action from 'src/action';
import * as Reducer from 'src/reducer';
import * as ActionItemMap from 'src/store/actionItemMap';
import * as View from 'src/store/view';
import { pipe } from 'src/utility/pipe';

// Store

export interface T {
    readonly view: View.T;
    readonly actionItems: ActionItemMap.T;
}

export function createDefault(): T {
    return {
        view: View.createDefault(),
        actionItems: ActionItemMap.createSampleData()
    };
}

// Actions

// Reducers

export type Actions =
    View.Actions |
    ActionItemMap.Actions;

export function reducer(i: T, a: Actions): T {
    return {
        view: View.reducer(i.view, a),
        actionItems: ActionItemMap.reducer(i.actionItems, a)
    };
}



type ActionKind =
    "Delete" |
    "Edit" |
    "Create";

// export function create<Type extends string>(type: Type): T<Type>;

// const setImportant = (f: ImportantFilter) => Action.create("view/setImportant", f);

export const MyActions = {
    create: () => Action.create<ActionKind>("Create"),
    edit: (id: string) => Action.create<ActionKind>("Edit"),
    delete: (id: string) => Action.create<ActionKind, { id: string }>("Delete", { id })
}

// type ActionTypeUnion<TActions extends { [actionCreator: string]: ((...args: any[]) => any) }> = {
//     [P in keyof TActions]: ReturnType<TActions[P]>
// }
// payload ? { type, payload } : { type };

type FunctionX = (...args: any[]) => any;
interface ActionFactoryMap { [actionCreator: string]: FunctionX };
type ActionTypesUnion<TA extends ActionFactoryMap> = ReturnType<TA[keyof TA]>;

type MyActions = ActionTypesUnion<typeof MyActions>;


// function createAction<A extends ActionTypes>(type: A): TypedAction<A>
// function createAction<A extends ActionTypes, P>(type: A, payload: P): TypePayloadAction<A, P>
// function createAction(type, payload?) {
//   return payload !== undefined ? {type, payload} : {type}
// }

// enum ActionTypes {
//   ACTION_1 = 'action 1',
//   ACTION_2 = 'action 2'
// }

// const actions = {
//   actionA: () => createAction(ActionTypes.ACTION_1, {a:1}),
//   actionB: () => createAction(ActionTypes.ACTION_2, {b:1}),
// }

// interface TypedAction<A> {
//   type: A
// }

// interface TypePayloadAction<A, P> extends TypedAction<A> {
//   payload: P
// }

// function reducer(state: State, action: ReturnType<typeof actions[keyof typeof actions]>): State {
//   switch (action.type) {
//     case ActionTypes.ACTION_1:
//       action.payload.a
//       // action.payload.b // error
//       return {}
//     case ActionTypes.ACTION_2:
//       // action.payload.a // error
//       action.payload.b
//       return {}
//   }
// }
