import { T as ImportantFilter } from 'src/importantFilter';
import { T as ActionUnion } from 'src/reactUtility/actionUnion';
import { createAction } from './reactUtility/action';
import { T as StatusFilter } from './statusFilter';

const setImportantFilter = (filter: ImportantFilter) => createAction("view/setImportant", filter);

const setStatusFilter = (filter: StatusFilter) => createAction("view/setStatus", filter);

export const factories = {
    setImportantFilter,
    setStatusFilter
}

export type ActionTypes = ActionUnion<typeof factories>;