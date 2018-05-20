import { ActionTypes, factory as actionFactory } from 'src/actions'

import { createDefault, T as CreateForm } from 'src/createForm'

export function reducer(s: CreateForm, a: ActionTypes): CreateForm {
    switch (a.type) {
        case "createForm_cancel": return createDefault();
        case "createForm_submit": return createDefault();

        // this logic should be with the data
        case "createForm_updateText": return { ...s, text: a.payload, canSubmit: a.payload.trim().length > 0 }

        default: return s;
    }
}