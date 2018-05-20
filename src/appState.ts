import * as ActionItemMap from 'src/actionItemMap';
import { ActionTypes } from 'src/actions'
import * as CreateForm from 'src/createForm';
import * as View from 'src/view'

export interface T {
    readonly view: View.T;
    readonly actionItems: ActionItemMap.T;
    readonly createForm: CreateForm.T;
}

export function createDefault(): T {
    return {
        view: View.createDefault(),
        actionItems: ActionItemMap.createSampleData(),
        createForm: CreateForm.createDefault()
    };
}

export const reducer = (s: T, a: ActionTypes) => {
    return {
        actionItems: ActionItemMap.reducer(s.actionItems, s.createForm, a),
        view: View.reducer(s.view, a),
        createForm: CreateForm.reducer(s.createForm, a)
    };
}