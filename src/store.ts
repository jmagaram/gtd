import { ActionTypes, factory as actionFactory } from 'src/actions'
import * as Store from 'src/reactUtility/atomDb'
import * as AppState from 'src/state/appState'

export type T = Store.T<AppState.T, ActionTypes>;

export function createDefault() {
    return Store.create(AppState.createDefault(), AppState.reducer)
}