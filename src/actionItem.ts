import * as UniqueId from './uniqueId';

export interface T {
    readonly uniqueId: UniqueId.T;
    readonly title: string;
    readonly isImportant: boolean;
    readonly isComplete: boolean;
}

export function create(props: {
    uniqueId?: UniqueId.T;
    title: string;
    isImportant?: boolean;
    isComplete?: boolean
}): T {
    return {
        title: props.title,
        isComplete: props.isComplete || false,
        isImportant: props.isImportant || false,
        uniqueId: props.uniqueId || UniqueId.create()
    };
}

export function toggleIsComplete(i: T): T {
    return { ...i, isComplete: !i.isComplete };
}

export function toggleIsImportant(i: T): T {
    return { ...i, isImportant: !i.isImportant };
}