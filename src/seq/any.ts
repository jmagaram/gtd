export function any<T>(source: Iterable<T>, predicate?: (item: T) => boolean) {
    for (const i of source) {
        if (predicate === undefined || predicate(i)) {
            return true;
        }
    }
    return false;
}

// tslint:disable-next-line:variable-name
export const any_ = <T>(predicate: (item: T) => boolean) => (source: Iterable<T>) => any(source, predicate);