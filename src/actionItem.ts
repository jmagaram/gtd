import * as Reducer from 'src/reducer';
import * as UniqueId from 'src/uniqueId';

export interface T {
    readonly uniqueId: UniqueId.T;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export function create(title: string, isImportant: boolean, isComplete: boolean): T {
    return {
        isComplete,
        isImportant,
        title,
        uniqueId: UniqueId.create()
    };
}