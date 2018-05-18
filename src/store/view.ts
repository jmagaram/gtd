import * as Action from 'src/action';
import * as ActionsUnion from 'src/actionUnion';
import * as Reducer from 'src/reducer';

// Store

export type ImportantFilter = "Important" | "NotImportant" | "Both";

export type StatusFilter = "Incomplete" | "Complete" | "Both";

export interface T {
    readonly important: ImportantFilter;
    readonly status: StatusFilter;
}

export function createDefault(): T {
    return {
        important: "Both",
        status: "Incomplete"
    };
}

// Actions

const setImportant = (f: ImportantFilter) => Action.create("view/setImportant", f);

const setStatus = (f: StatusFilter) => Action.create("view/setStatus", { f, isSetStatus: true });

const actions = {
    setImportant,
    setStatus
}

export type Actions = ActionsUnion.T<typeof actions>

// Reducers

export function reducer(f: T, a: Actions): any {
    switch (a.type) {
        case "view/setImportant": {
            return { ...f, important: a.payload };
        }
        case "view/setStatus": {
            return { ...f, status: a.payload.f };
        }
    }
}