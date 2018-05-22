import * as Option from '../utility/option'
import { fromGenerator } from './fromGenerator';

export function scan<T extends Option.Some, TSum>(source: Iterable<T>, seed: TSum, accumulator: (sum: TSum, item: T) => TSum) {
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

// tslint:disable-next-line:variable-name
export const scan_ = <T extends Option.Some, TSum>(seed: TSum, accumulator: (sum: TSum, item: T) => TSum) => (source: Iterable<T>) => scan(source, seed, accumulator);