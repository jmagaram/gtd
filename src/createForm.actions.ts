import { T as ActionUnion } from 'src/reactUtility/actionUnion';
import { createAction } from './reactUtility/action';

const cancel = () => createAction("createForm/cancel");

const submit = () => createAction("createForm/submit");

const updateText = (text: string) => createAction("createForm/updateText", text);

export const factories = {
    cancel,
    submit,
    updateText
}

export type ActionTypes = ActionUnion<typeof factories>