export function find<T>(source: Iterable<T>, predicate: (item: T) => boolean): T | undefined {
    for (const i of source) {
        if (predicate(i)) {
            return i;
        }
    }
    return undefined;
}