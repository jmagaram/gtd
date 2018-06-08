import { ActionTypes } from "src/actions";
import * as ActionItemArray from "src/state/actionItemArray";
import * as CreateForm from "src/state/createForm";
import * as View from "src/state/view";

export interface T {
  readonly view: View.T;
  readonly actionItems: ActionItemArray.T;
  readonly createForm: CreateForm.T;
  readonly notification: string;
}

export function createDefault(): T {
  return {
    view: View.createDefault(),
    actionItems: [],
    createForm: CreateForm.createDefault(),
    notification: ""
  };
}

export const reducer = (s: T, a: ActionTypes) => {
  const updatedState: T = {
    actionItems: ActionItemArray.reducer(s.actionItems, s.createForm, a),
    view: View.reducer(s.view, a),
    createForm: CreateForm.reducer(s.createForm, a),
    notification: notificationReducer(s.notification, a)
  };
  const isSame = Object.keys(updatedState).every(i => updatedState[i] === s[i]);
  return isSame ? s : updatedState;
};

const notificationReducer = (message: string, a: ActionTypes) =>
  a.type === "error_hide"
    ? ""
    : a.type === "error_display"
      ? a.payload.message
      : message;
