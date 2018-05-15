import { T as ZeroBasedIndex } from '../utility/zeroBasedIndex';
import { fromGenerator } from './fromGenerator';

export function init(count: number): Iterable<ZeroBasedIndex> {
    function* items() {
        for (let i: number = 0; i < count; i++) {
            yield i as ZeroBasedIndex;
        }
    }
    return fromGenerator(items);
}