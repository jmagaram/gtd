import * as ActionItem from 'src/actionItem'
import * as Reducers from 'src/actionItem.reducer'
import { ActionTypes } from 'src/actions'

export const reducer = <T>(i: ActionItem.T, action: ActionTypes): ActionItem.T => {
    switch (action.type) {
        case "actionItem_toggleComplete": return { ...i, isComplete: !i.isComplete };
        case "actionItem_toggleImportant": return { ...i, isImportant: !i.isImportant };
        default: return i;
    }
}