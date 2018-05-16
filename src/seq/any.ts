export function any<T>(source: Iterable<T>, predicate?: (item: T) => boolean) {
    for (const i of source) {
        if (predicate === undefined || predicate(i)) {
            return true;
        }
    }
    return false;
}