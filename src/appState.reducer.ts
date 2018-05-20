import { ActionTypes } from 'src/actions'

import * as ActionMapReducer from 'src/actionItemMap.reducer'
import * as AppState from 'src/appState'
import * as CreateFormReducer from 'src/createForm.reducer'
import * as Reducer from 'src/reactUtility/reducer'
import * as ViewReducer from 'src/view.reducer'

export const reducer: Reducer.T<AppState.T, ActionTypes> = (s: AppState.T, a: ActionTypes) => {
    return {
        actionItems: ActionMapReducer.reducer(s.actionItems, s.createForm, a),
        view: ViewReducer.reducer(s.view, a),
        createForm: CreateFormReducer.reducer(s.createForm, a)
    };
}