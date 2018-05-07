import { ActionItem, ActionItemTitle } from './types'
import createUniqueId from './uniqueId'

export function actionItemTitle(i: string): ActionItemTitle {
    const trimmed = i.trim();
    if (trimmed.length < 1) {
        throw new RangeError("The title is too short.");
    }
    if (trimmed.length > 50) {
        throw new RangeError("The title is too long.");
    }
    return i as ActionItemTitle;
}

export function actionItem(
    required: { [P in "title"]: ActionItem[P] },
    optional: { [P in "uniqueId" | "isImportant" | "isComplete"]?: ActionItem[P] }): ActionItem {
    return {
        title: actionItemTitle(""),
        isComplete: optional.isComplete || false,
        isImportant: optional.isImportant || false,
        uniqueId: optional.uniqueId || createUniqueId()
    };
}

export function toggleIsComplete(i: ActionItem): ActionItem {
    return { ...i, isComplete: !i.isComplete };
}

export function toggleIsImportant(i: ActionItem): ActionItem {
    return { ...i, isImportant: !i.isImportant };
}