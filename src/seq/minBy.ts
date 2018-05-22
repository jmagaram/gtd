import * as Option from '../utility/option'

export function minBy<T extends Option.Some, U extends Option.Some>(source: Iterable<T>, selector: (t: T) => U): T | undefined {
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

// tslint:disable-next-line:variable-name
export const minBy_ = <T extends Option.Some, U extends Option.Some>(selector: (t: T) => U) => (source: Iterable<T>) => minBy(source, selector);