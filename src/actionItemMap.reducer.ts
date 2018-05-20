import * as ActionItem from 'src/actionItem'
import * as ActionItemReducer from 'src/actionItem.reducer'
import * as ActionMap from 'src/actionItemMap'
import { ActionTypes, factory as actionFactory } from 'src/actions'

import * as CreateForm from 'src/createForm'
import * as Reducer from 'src/reactUtility/reducer'
import * as Seq from 'src/seq/index'
import * as UniqueId from 'src/uniqueId'

export const reducer = (s: ActionMap.T, form: CreateForm.T, a: ActionTypes) => {
    switch (a.type) {
        case "actionItem_create": {
            const c = ActionItem.create(a.payload.title, a.payload.isImportant, a.payload.isComplete);
            const cKeyValue: [UniqueId.T, ActionItem.T] = [c.uniqueId, c];
            return new Map(Seq.append(s, [cKeyValue]));
        }
        case "createForm_submit": {
            const c = ActionItem.create(form.text, false, false);
            const cKeyValue: [UniqueId.T, ActionItem.T] = [c.uniqueId, c];
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
                        const val = ActionItemReducer.reducer(i[1], a);
                        const res = [key, val] as [UniqueId.T, ActionItem.T];
                        return res;
                    }
                });
                const r = new Map(modified);
                return r;
            }
        default: return s;
    }
}