import * as AppState from 'src/appState'
import * as AppStateActions from 'src/appState.actions'
import * as AppStateReducer from 'src/appState.reducer'

import * as Store from 'src/reactUtility/atomDb'

export type T = Store.T<AppState.T, AppStateActions.ActionTypes>;

export function createDefault() {
    return Store.create(AppState.createDefault(), AppStateReducer.reducer)
}