import { ActionTypes, factory as actionFactory } from 'src/actions'

import * as Reducer from 'src/reactUtility/reducer'
import * as View from 'src/view'

export const reducer: Reducer.T<View.T, ActionTypes> = (s: View.T, a: ActionTypes) => {
    switch (a.type) {
        case "view_setImportantFilter": return { ...s, important: a.payload };
        case "view_setStatusFilter": return { ...s, status: a.payload };
        default: return s;
    }
}