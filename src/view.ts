export interface T {
    readonly onlyShowIncomplete: boolean;
    readonly onlyShowImportant: boolean;
}

export function create(props: Partial<T> = {}): T {
    return {
        onlyShowImportant: props.onlyShowImportant || false,
        onlyShowIncomplete: props.onlyShowIncomplete || true
    };
}

export function toggleOnlyShowImportant(source: T): T {
    return { ...source, onlyShowImportant: !source.onlyShowImportant };
}

export function toggleOnlyShowIncomplete(source: T): T {
    return { ...source, onlyShowIncomplete: !source.onlyShowIncomplete };
}