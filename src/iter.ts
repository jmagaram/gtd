import { pipe } from './pipe';

export function filter<T>(source: Iterable<T>, predicate: (item: T) => boolean) {
    function* items() {
        for (const i of source) {
            if (predicate(i)) {
                yield i;
            }
        }
    }
    return { [Symbol.iterator]: items }
}

export function map<T, U>(source: Iterable<T>, selector: (t: T) => U) {
    function* items() {
        for (const i of source) {
            yield selector(i);
        }
    }
    return { [Symbol.iterator]: items }
}

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

export function take<T>(args: { source: Iterable<T>, count: number }) {
    function* items() {
        if (args.count === 0) {
            return;
        }
        else {
            let taken = 0;
            for (const i of args.source) {
                yield i;
                taken++;
                if (taken === args.count) {
                    break;
                }
            }
            if (taken !== args.count) {
                throw new Error(`The sequence did not have at least ${args.count} items.`);
            }
        }
    }
    return { [Symbol.iterator]: items };
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

export function init(args: { count: number }): Iterable<number> {
    function* items() {
        for (let i: number = 0; i < args.count; i++) {
            yield i;
        }
    }
    return {
        [Symbol.iterator]: items
    }
}

export function unfold<T, TState>(args: { seed: TState, generator: (state: TState) => ([T, TState] | undefined) }) {
    function* items() {
        let state: TState | undefined = args.seed;
        do {
            const next = args.generator(state);
            if (next !== undefined) {
                yield next[0];
                state = next[1];
            }
            else {
                state = undefined;
            }
        } while (state !== undefined)
    }
    return {
        [Symbol.iterator]: items
    }
}