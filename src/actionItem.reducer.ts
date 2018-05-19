import * as ActionItem from 'src/actionItem'
import * as Actions from 'src/actionItem.actions'
import * as Reducers from 'src/actionItem.reducer'

export const reducer = <T>(i: ActionItem.T, action: Actions.Types): ActionItem.T => {
    switch (action.type) {
        case "actionItem/toggleComplete": return { ...i, isComplete: !i.isComplete };
        case "actionItem/toggleImportant": return { ...i, isImportant: !i.isImportant };
    }
}