import { ActionTypes } from "src/actions";
import * as StorageService from "src/db/storageService";
import * as Seq from "src/seq/index";
import * as UniqueId from "src/state/uniqueId";
import * as Option from "src/utility/option";
import { pipe } from "src/utility/pipe";

export interface T {
  readonly uniqueId: UniqueId.T;
  readonly title: string;
  readonly isImportant: boolean;
  readonly isComplete: boolean;
  readonly purgePercentComplete?: number;
}

export function createActionItem(title: string, isImportant: boolean, isComplete: boolean): T {
  return {
    isComplete,
    isImportant,
    title,
    uniqueId: UniqueId.create(),
    purgePercentComplete: undefined
  };
}

export function createActionItemWithId(id: UniqueId.T, title: string, isImportant: boolean, isComplete: boolean): T {
  return {
    isComplete,
    isImportant,
    title,
    uniqueId: id,
    purgePercentComplete: undefined
  };
}

export const reducer = (i: T, action: ActionTypes): T => {
  switch (action.type) {
    case "actionItem_updatePurgeCountdown":
      return action.payload.id === i.uniqueId ? { ...i, purgePercentComplete: action.payload.percentComplete } : i;
    case "actionItem_cancelPurge":
      return action.payload.id === i.uniqueId ? { ...i, purgePercentComplete: undefined } : i;
    case "dbUpdate": {
      const updatedItem = pipe(
        () => action.payload,
        Seq.choose_(
          a => (a.table === "ActionItem" && a.type === "Updated" && a.current.id === i.uniqueId ? a.current : undefined)
        ),
        Seq.exactlyOne,
        Option.create,
        Option.map_<StorageService.ActionItem, T>(j => ({
          uniqueId: j.id as UniqueId.T,
          title: j.title,
          isComplete: j.isComplete,
          isImportant: j.isImportant
        })),
        Option.reduce_(i)
      );
      return updatedItem();
    }
    default:
      return i;
  }
};
