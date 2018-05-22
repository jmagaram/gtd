import * as Option from '../utility/option'

export function reduce<T extends Option.Some>(source: Iterable<T>, accumulator: (t1: T, t2: T) => T): T | undefined {
    let total: T | undefined;
    for (const i of source) {
        if (total === undefined) {
            total = i;
        }
        else {
            total = accumulator(total, i);
        }
    }
    return total;
}

// tslint:disable-next-line:variable-name
export const reduce_ = <T extends Option.Some>(accumulator: (t1: T, t2: T) => T) => (source: Iterable<T>) => reduce(source, accumulator);
