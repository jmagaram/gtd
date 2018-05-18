import * as AppState from 'src/appState.actions'
import * as Reducer from 'src/reactUtility/reducer'
import * as View from 'src/view'

export const reducer: Reducer.T<View.T, AppState.ActionTypes> = (s: View.T, a: AppState.ActionTypes) => {
    switch (a.type) {
        case "view/setImportant": return { ...s, important: a.payload };
        case "view/setStatus": return { ...s, status: a.payload };
        default: return s;
    }
}