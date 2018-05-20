import { ActionTypes } from 'src/actions'
import * as Seq from 'src/seq/index';
import { createActionItem, reducer as actionItemReducer, T as ActionItem } from 'src/state/actionItem';
import * as CreateForm from 'src/state/createForm'
import { T as UniqueId } from 'src/state/uniqueId';

export type T = ReadonlyMap<UniqueId, ActionItem>;

export function createSampleData(): T {
    return new Map(Seq.map(Seq.fromGenerator(sampleActionsGenerator), j => [j.uniqueId, j] as [UniqueId, ActionItem]));
}

function* sampleActionsGenerator() {
    yield createActionItem("Change the light bulbs", false, false);
    yield createActionItem("Empty the fridge", false, false);
    yield createActionItem("Work out in the gym", true, false);
    yield createActionItem("Check tire pressure", false, true);
}

export const reducer = (s: T, form: CreateForm.T, a: ActionTypes): T => {
    switch (a.type) {
        case "actionItem_create": {
            const c = createActionItem(a.payload.title, a.payload.isImportant, a.payload.isComplete);
            const cKeyValue: [UniqueId, ActionItem] = [c.uniqueId, c];
            return new Map(Seq.append(s, [cKeyValue]));
        }
        case "createForm_submit": {
            const c = createActionItem(form.text, false, false);
            const cKeyValue: [UniqueId, ActionItem] = [c.uniqueId, c];
            return new Map(Seq.append(s, [cKeyValue]));
        }
        case "actionItem_purge": return new Map(Seq.filter(s, i => i[0] !== a.payload));
        case "actionItem_toggleComplete":
        case "actionItem_toggleImportant":
            {
                const modified = Seq.map(s, i => {
                    if (i[0] !== a.payload.id) {
                        return i;
                    }
                    else {
                        const key = i[0];
                        const val = actionItemReducer(i[1], a);
                        const res = [key, val] as [UniqueId, ActionItem];
                        return res;
                    }
                });
                const r = new Map(modified);
                return r;
            }
        default: return s;
    }
}