import { ActionTypes as AppStateActionTypes } from 'src/appState.actions'
import { createDefault, T as CreateForm } from 'src/createForm'

export function reducer(s: CreateForm, a: AppStateActionTypes): CreateForm {
    switch (a.type) {
        case "createForm/cancel": return createDefault();
        case "createForm/submit": return createDefault();

        // this logic should be with the data
        case "createForm/updateText": return { ...s, text: a.payload, canSubmit: a.payload.trim().length > 0 }

        default: return s;
    }
}