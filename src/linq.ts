export function* filter<T>(predicate: (item: T) => boolean, source: Iterable<T>) {
    for (const i of source) {
        if (predicate(i)) {
            yield i;
        }
    }
}

export function toArray<T>(source: Iterable<T>) {
    return Array.from(source);
}

