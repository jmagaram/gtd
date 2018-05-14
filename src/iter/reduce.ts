export function reduce<T>(source: Iterable<T>, accumulator: (t1: T, t2: T) => T): T | undefined {
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

