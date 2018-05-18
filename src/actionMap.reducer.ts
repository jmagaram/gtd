import * as ActionItem from 'src/actionItem'
import * as ActionMap from 'src/actionItemMap'
import * as AppState from 'src/appState.actions'
import * as Reducer from 'src/reactUtility/reducer'
import * as Seq from 'src/seq/index'
import * as UniqueId from 'src/uniqueId'

export const reducer: Reducer.T<ActionMap.T, AppState.ActionTypes> = (s: ActionMap.T, a: AppState.ActionTypes) => {
    switch (a.type) {
        case "actionItemMap/create": {
            const c = ActionItem.create(a.payload.title, a.payload.isImportant, a.payload.isComplete);
            const cKeyValue: [UniqueId.T, ActionItem.T] = [c.uniqueId, c];
            return new Map(Seq.append(s, [cKeyValue]));
        }
        case "actionItemMap/purge": return new Map(Seq.filter(s, i => i[0] !== a.payload));
        default: return s;
    }
}