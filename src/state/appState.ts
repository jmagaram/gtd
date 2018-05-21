import { ActionTypes } from 'src/actions'
import * as ActionItemArray from 'src/state/actionItemArray';
import * as CreateForm from 'src/state/createForm';
import * as View from 'src/state/view'

export interface T {
    readonly view: View.T;
    readonly actionItems: ActionItemArray.T;
    readonly createForm: CreateForm.T;
}

export function createDefault(): T {
    return {
        view: View.createDefault(),
        actionItems: ActionItemArray.createSampleData(),
        createForm: CreateForm.createDefault()
    };
}

export const reducer = (s: T, a: ActionTypes) => {
    return {
        actionItems: ActionItemArray.reducer(s.actionItems, s.createForm, a),
        view: View.reducer(s.view, a),
        createForm: CreateForm.reducer(s.createForm, a)
    };
}