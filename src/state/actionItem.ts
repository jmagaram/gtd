import { ActionTypes } from 'src/actions'
import * as UniqueId from 'src/state/uniqueId';

export interface T {
    readonly uniqueId: UniqueId.T;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export function createActionItem(title: string, isImportant: boolean, isComplete: boolean): T {
    return {
        isComplete,
        isImportant,
        title,
        uniqueId: UniqueId.create()
    };
}

export const reducer = (i: T, action: ActionTypes): T => {
    switch (action.type) {
        case "actionItem_toggleComplete": return { ...i, isComplete: !i.isComplete };
        case "actionItem_toggleImportant": return { ...i, isImportant: !i.isImportant };
        default: return i;
    }
}