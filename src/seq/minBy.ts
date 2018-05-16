export function minBy<T, U>(source: Iterable<T>, selector: (t: T) => U): T | undefined {
    let min: T | undefined;
    let minKey: U | undefined;
    for (const i of source) {
        const key = selector(i);
        if (minKey === undefined || key < minKey) {
            min = i;
            minKey = key;
        }
    }
    return min;
}