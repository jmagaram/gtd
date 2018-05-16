export function none<T>(source: Iterable<T>, predicate: (item: T) => boolean = (item: T) => true) {
    for (const i of source) {
        if (predicate(i)) {
            return false;
        }
    }
    return true;
}