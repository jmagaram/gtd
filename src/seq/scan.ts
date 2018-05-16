import { fromGenerator } from './fromGenerator';

export function scan<T, TSum>(source: Iterable<T>, seed: TSum, accumulator: (sum: TSum, item: T) => TSum) {
    function* items() {
        let sum: TSum = seed;
        yield sum;
        for (const i of source) {
            sum = accumulator(sum, i);
            yield sum;
        }
    }
    return fromGenerator(items);
}