export function all<T>(source: Iterable<T>, predicate: (item: T) => boolean) {
    for (const i of source) {
        if (!predicate(i)) {
            return false;
        }
    }
    return true;
}