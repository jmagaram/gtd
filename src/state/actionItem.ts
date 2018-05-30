import { ActionTypes } from 'src/actions'
import * as UniqueId from 'src/state/uniqueId';

export interface T {
    readonly uniqueId: UniqueId.T;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
    readonly purgePercentComplete?: number;
}

export function createActionItem(title: string, isImportant: boolean, isComplete: boolean): T {
    return {
        isComplete,
        isImportant,
        title,
        uniqueId: UniqueId.create(),
        purgePercentComplete: undefined
    };
}

export function createActionItemWithId(id: UniqueId.T, title: string, isImportant: boolean, isComplete: boolean): T {
    return {
        isComplete,
        isImportant,
        title,
        uniqueId: id,
        purgePercentComplete: undefined
    };
}

export const reducer = (i: T, action: ActionTypes): T => {
    switch (action.type) {
        case "actionItem_toggleComplete": return action.payload.id === i.uniqueId ? { ...i, isComplete: !i.isComplete } : i;
        case "actionItem_toggleImportant": return action.payload.id === i.uniqueId ? { ...i, isImportant: !i.isImportant } : i;
        case "actionItem_updatePurgeCountdown": return action.payload.id === i.uniqueId ? { ...i, purgePercentComplete: action.payload.percentComplete } : i;
        case "actionItem_cancelPurge": return action.payload.id === i.uniqueId ? { ...i, purgePercentComplete: undefined } : i;
        default: return i;
    }
}