import * as Tagged from '../tagged';
import { fromGenerator } from './fromGenerator';

export function mapi<T, U>(source: Iterable<T>, selector: (index: number, item: T) => U) {
    function* items() {
        let index = 0;
        for (const item of source) {
            yield selector(index, item);
            index++;
        }
    }
    return fromGenerator(items);
}