import * as ActionMapActions from 'src/actionItemMap.actions'
import * as ActionMapReducer from 'src/actionItemMap.reducer'
import * as AppState from 'src/appState'
import * as AppStateActions from 'src/appState.actions'
import * as CreateFormReducer from 'src/createForm.reducer'
import * as Reducer from 'src/reactUtility/reducer'
import * as ViewReducer from 'src/view.reducer'

export const reducer: Reducer.T<AppState.T, AppStateActions.ActionTypes> = (s: AppState.T, a: AppStateActions.ActionTypes) => {
    return {
        actionItems: ActionMapReducer.reducer(s.actionItems, s.createForm, a),
        view: ViewReducer.reducer(s.view, a),
        createForm: CreateFormReducer.reducer(s.createForm, a)
    };
}