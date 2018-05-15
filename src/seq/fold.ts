export function fold<T, TSum>(source: Iterable<T>, seed: TSum, accumulator: (sum: TSum, item: T) => TSum): TSum {
    let total = seed;
    for (const i of source) {
        total = accumulator(total, i);
    }
    return total;
}

