export function all<T>(source: Iterable<T>, predicate: (item: T) => boolean) {
    for (const i of source) {
        if (!predicate(i)) {
            return false;
        }
    }
    return true;
}

// tslint:disable-next-line:variable-name
export const all_ = <T>(predicate: (item: T) => boolean) => (source: Iterable<T>) => all(source, predicate);