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
    const children = s.map(i => actionItemReducer(i, a));
    const collection =
        (a.type === "createForm_submit") ? children.concat([createActionItem(form.text, false, false)]) :
            (a.type === "actionItem_purge") ? children.filter(i => i.uniqueId !== a.payload) :
                children;
    return collection; // should only return this if different contents than s
}