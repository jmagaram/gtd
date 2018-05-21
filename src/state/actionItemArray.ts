import { ActionTypes } from 'src/actions'
import * as Seq from 'src/seq/index';
import { createActionItem, reducer as actionItemReducer, T as ActionItem } from 'src/state/actionItem';
import * as CreateForm from 'src/state/createForm'

export type T = ReadonlyArray<ActionItem>;

export function createSampleData(): T {
    return Array.from(Seq.fromGenerator(sampleActionsGenerator));
}

function* sampleActionsGenerator() {
    yield createActionItem("Change the light bulbs", false, false);
    yield createActionItem("Empty the fridge", false, false);
    yield createActionItem("Work out in the gym", true, false);
    yield createActionItem("Check tire pressure", false, true);
}

export const reducer = (s: T, form: CreateForm.T, a: ActionTypes): T => {
    switch (a.type) {
        case "createForm_submit": {
            const c = createActionItem(form.text, false, false);
            return s.concat([c]);
        }
        case "actionItem_purge": return s.filter(i => i.uniqueId !== a.payload);
        case "actionItem_toggleComplete":
        case "actionItem_toggleImportant": return s.map(i => actionItemReducer(i, a));
        default: return s;
    }
}