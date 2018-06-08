import * as StorageService from "src/db/storageService";
import { T as ImportantFilter } from "src/state/importantFilter";
import { T as StatusFilter } from "src/state/statusFilter";
import { T as UniqueId } from "src/state/uniqueId";
import { ActionTypeUnion, createAction } from "src/utility/action";

export const factory = {
  actionItem_startPurge: (id: UniqueId) =>
    createAction("actionItem_startPurge", { id }),
  actionItem_updatePurgeCountdown: (id: UniqueId, percentComplete: number) =>
    createAction("actionItem_updatePurgeCountdown", { id, percentComplete }),
  actionItem_cancelPurge: (id: UniqueId) =>
    createAction("actionItem_cancelPurge", { id }),
  actionItem_toggleImportant: (id: UniqueId) =>
    createAction("actionItem_toggleImportant", { id }),
  actionItem_toggleComplete: (id: UniqueId) =>
    createAction("actionItem_toggleComplete", { id }),

  error_display: (message: string) =>
    createAction("error_display", { message }),
  error_hide: () => createAction("error_hide"),

  doNothing: () => createAction("doNothing"),

  db_update: (changes: ReadonlyArray<StorageService.RowChange>) =>
    createAction("dbUpdate", changes),
  db_startRefreshAll: () => createAction("db_startRefreshAll"),
  db_refreshAll: (actionItems: ReadonlyArray<StorageService.ActionItem>) =>
    createAction("dbRefreshAll", { actionItems }),

  createForm_cancel: () => createAction("createForm_cancel"),
  createForm_submit: () => createAction("createForm_submit"),
  createForm_reset: () => createAction("createForm_reset"),
  createForm_updateText: (text: string) =>
    createAction("createForm_updateText", text),

  view_setImportantFilter: (filter: ImportantFilter) =>
    createAction("view_setImportantFilter", filter),
  view_setStatusFilter: (filter: StatusFilter) =>
    createAction("view_setStatusFilter", filter)
};

export type ActionTypes = ActionTypeUnion<typeof factory>;
