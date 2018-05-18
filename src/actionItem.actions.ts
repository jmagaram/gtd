import { T as ActionUnion } from 'src/reactUtility/actionUnion';
import { T as UniqueId } from 'src/uniqueId';
import { createAction } from './reactUtility/action';

const toggleImportant = (id: UniqueId) => createAction("actionItem/toggleImportant", { id });

const toggleComplete = (id: UniqueId) => createAction("actionItem/toggleComplete", { id });

export const factories = {
    toggleImportant,
    toggleComplete
}

export type Types = ActionUnion<typeof factories>;
