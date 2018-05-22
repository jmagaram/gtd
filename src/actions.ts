import { ActionTypeUnion, createAction } from 'src/reactUtility/action'
import { T as ImportantFilter } from 'src/state/importantFilter'
import { T as StatusFilter } from 'src/state/statusFilter'
import { T as UniqueId } from 'src/state/uniqueId'

export const factory = {
    actionItem_toggleImportant: (id: UniqueId) => createAction("actionItem_toggleImportant", { id }),
    actionItem_toggleComplete: (id: UniqueId) => createAction("actionItem_toggleComplete", { id }),
    actionItem_purge: (id: UniqueId) => createAction("actionItem_purge", id),
    actionItem_startPurge: (id: UniqueId) => createAction("actionItem_startPurge", { id }),
    actionItem_updatePurgeCountdown: (id: UniqueId, percentComplete: number) => createAction("actionItem_updatePurgeCountdown", { id, percentComplete }),
    actionItem_cancelPurge: (id: UniqueId) => createAction("actionItem_cancelPurge", { id }),

    createForm_cancel: () => createAction("createForm_cancel"),
    createForm_submit: () => createAction("createForm_submit"),
    createForm_updateText: (text: string) => createAction("createForm_updateText", text),

    view_setImportantFilter: (filter: ImportantFilter) => createAction("view_setImportantFilter", filter),
    view_setStatusFilter: (filter: StatusFilter) => createAction("view_setStatusFilter", filter)
}

export type ActionTypes = ActionTypeUnion<typeof factory>;
