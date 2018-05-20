import { ActionTypeUnion, createAction } from 'src/reactUtility/action'
import { T as ImportantFilter } from 'src/state/importantFilter'
import { T as StatusFilter } from 'src/state/statusFilter'
import { T as UniqueId } from 'src/state/uniqueId'

export const factory = {
    actionItem_toggleImportant: (id: UniqueId) => createAction("actionItem_toggleImportant", { id }),
    actionItem_toggleComplete: (id: UniqueId) => createAction("actionItem_toggleComplete", { id }),
    actionItem_purge: (id: UniqueId) => createAction("actionItem_purge", id),
    actionItem_create: (title: string, isImportant: boolean, isComplete: boolean) =>
        createAction("actionItem_create", { title, isImportant, isComplete }),

    createForm_cancel: () => createAction("createForm_cancel"),
    createForm_submit: () => createAction("createForm_submit"),
    createForm_updateText: (text: string) => createAction("createForm_updateText", text),

    view_setImportantFilter: (filter: ImportantFilter) => createAction("view_setImportantFilter", filter),
    view_setStatusFilter: (filter: StatusFilter) => createAction("view_setStatusFilter", filter)
}

export type ActionTypes = ActionTypeUnion<typeof factory>;
