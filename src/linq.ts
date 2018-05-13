import { pipe } from './pipe';

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

export function reduce<T>(source: Iterable<T>, accumulator: (t1: T, t2: T) => T): T | undefined {
    let total: T | undefined;
    for (const i of source) {
        if (total == undefined) {
            total = i;
        }
        else {
            total = accumulator(total, i);
        }
    }
    return total;
}

export function length<T>(source: Iterable<T>): number {
    return fold(source, 0, (sum, item) => sum + 1);
}

export function fold<T, TSum>(
    source: Iterable<T>,
    seed: TSum,
    accumulator: (sum: TSum, item: T) => TSum): TSum {
    let total = seed;
    for (const i of source) {
        total = accumulator(total, i);
    }
    return total;
}

export function toArray<T>(source: Iterable<T>) {
    return Array.from(source);
}

export function toSet<T>(source: Iterable<T>) {
    return new Set<T>(source);
}

export function toMap<T, TKey, TValue>(source: Iterable<T>, keyValue: (t: T) => [TKey, TValue]): Map<TKey, TValue> {
    return pipe(
        () => source,
        i => map(i, keyValue),
        i => new Map(i));
}

export function* range(args: { from: number, to: number }) {
    for (let i: number = args.from; i <= args.to; i++) {
        yield i;
    }
}