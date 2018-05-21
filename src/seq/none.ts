export function none<T>(source: Iterable<T>, predicate: (item: T) => boolean = (item: T) => true) {
    for (const i of source) {
        if (predicate(i)) {
            return false;
        }
    }
    return true;
}

// tslint:disable-next-line:variable-name
export const none_ = <T>(predicate: (item: T) => boolean) => (source: Iterable<T>) => none(source, predicate);