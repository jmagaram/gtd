import { ActionTypes } from 'src/actions'

export interface T {
    readonly text: string;
    readonly canSubmit: boolean;
}

export function createDefault(): T {
    return {
        text: "",
        canSubmit: false
    }
}

export function reducer(s: T, a: ActionTypes): T {
    switch (a.type) {
        case "createForm_cancel": return createDefault();
        case "createForm_submit": return createDefault();
        case "createForm_updateText": return { ...s, text: a.payload, canSubmit: a.payload.trim().length > 0 }
        default: return s;
    }
}