import * as ActionItemActions from 'src/actionItem.actions'
import * as ActionItemMapAction from 'src/actionItemMap.actions'
import * as ViewActions from 'src/view.actions'

export type ActionTypes =
    ActionItemMapAction.ActionTypes |
    ViewActions.ActionTypes |
    ActionItemActions.Types;