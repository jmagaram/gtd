import { ActionTypes, factory as actionFactory } from 'src/actions'
import * as AppState from 'src/appState'
import * as Store from 'src/reactUtility/atomDb'

export type T = Store.T<AppState.T, ActionTypes>;

export function createDefault() {
    return Store.create(AppState.createDefault(), AppState.reducer)
}