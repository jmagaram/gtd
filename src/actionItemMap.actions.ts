import { T as ActionUnion } from 'src/reactUtility/actionUnion';
import { T as UniqueId } from 'src/uniqueId';
import { createAction } from './reactUtility/action';

const purge = (id: UniqueId) => createAction("actionItemMap/purge", id);

const create = (
    title: string,
    isImportant: boolean,
    isComplete: boolean) => createAction("actionItemMap/create", { title, isImportant, isComplete });

export const factories = {
    purge,
    create
}

export type ActionTypes = ActionUnion<typeof factories>