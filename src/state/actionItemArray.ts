import { ActionTypes } from "src/actions";
import * as StorageService from "src/db/storageService";
import * as Seq from "src/seq/index";
import {
  createActionItem,
  createActionItemWithId,
  reducer as actionItemReducer,
  T as ActionItem
} from "src/state/actionItem";
import * as CreateForm from "src/state/createForm";
import * as UniqueId from "src/state/uniqueId";

export type T = ReadonlyArray<ActionItem>;

export function createSampleData(): T {
  return Array.from(Seq.fromGenerator(sampleActionsGenerator));
}

function* sampleActionsGenerator() {
  yield createActionItem("Change the light bulbs", false, false);
  yield createActionItem("Empty the fridge", false, false);
  yield createActionItem("Work out in the gym", true, false);
  yield createActionItem("Check tire pressure", false, true);
}

export const reducer = (s: T, form: CreateForm.T, a: ActionTypes): T => {
  if (a.type !== "dbUpdate") {
    let updatedChildren = s.map(i => actionItemReducer(i, a));
    return Array.from(updatedChildren);
  } else {
    let updatedChildren = s.map(i => actionItemReducer(i, a));
    const changes = Seq.filter(a.payload, i => i.table === "ActionItem");
    for (const c of changes) {
      switch (c.type) {
        case "Inserted":
          updatedChildren = updatedChildren.concat([
            createActionItemWithId(
              c.current.id as UniqueId.T,
              c.current.title,
              c.current.isImportant,
              c.current.isComplete
            )
          ]);
          break;
        case "Deleted":
          updatedChildren = updatedChildren.filter(
            i => i.uniqueId !== c.deleted.id
          );
          break;
        default:
          break;
      }
    }
    if (Seq.sequenceEqual(s, updatedChildren)) {
      return s;
    } else {
      return updatedChildren;
    }
  }
};
