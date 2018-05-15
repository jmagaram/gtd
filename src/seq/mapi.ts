import { T as ZeroBasedIndex } from '../utility/zeroBasedIndex';
import { fromGenerator } from './fromGenerator';

export function mapi<T, U>(source: Iterable<T>, selector: (index: ZeroBasedIndex, item: T) => U) {
    function* items() {
        let index = 0;
        for (const item of source) {
            yield selector(index as ZeroBasedIndex, item);
            index++;
        }
    }
    return fromGenerator(items);
}