export function* filter<T>(source: Iterable<T>, predicate: (item: T) => boolean) {
    for (const i of source) {
        if (predicate(i)) {
            yield i;
        }
    }
}

export function* map<T, U>(source: Iterable<T>, selector: (t: T) => U) {
    for (const i of source) {
        yield selector(i);
    }
}

export function toArray<T>(source: Iterable<T>) {
    return Array.from(source);
}

