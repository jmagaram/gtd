import * as Action from 'src/action';
import * as ActionUnion from 'src/actionUnion';
import * as Reducer from 'src/reducer';
import * as UniqueId from 'src/uniqueId';

// Store

export interface T {
    readonly uniqueId: UniqueId.T;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export function create(title: string, isImportant: boolean, isComplete: boolean): T {
    return {
        isComplete,
        isImportant,
        title,
        uniqueId: UniqueId.create()
    };
}

// Actions

const toggleImportant = (id: UniqueId.T) => Action.create("actionItem/toggleImportant", { id });

const toggleComplete = (id: UniqueId.T) => Action.create("actionItem/toggleComplete", { id });

const actions = {
    toggleImportant,
    toggleComplete
}

export type Actions = ActionUnion.T<typeof actions>;

// Reducers

export function reducer(i: T, a: Actions): T {
    switch (a.type) {
        case "actionItem/toggleImportant": return { ...i, isImportant: !i.isComplete };
        case "actionItem/toggleImportant": return { ...i, isComplete: !i.isComplete };
    }
}