export function maxBy<T, U>(source: Iterable<T>, selector: (t: T) => U): T | undefined {
    let max: T | undefined;
    let maxKey: U | undefined;
    for (const i of source) {
        const key = selector(i);
        if (maxKey === undefined || key > maxKey) {
            max = i;
            maxKey = key;
        }
    }
    return max;
}

// tslint:disable-next-line:variable-name
export const maxBy_ = <T, U>(selector: (t: T) => U) => (source: Iterable<T>) => maxBy(source, selector);