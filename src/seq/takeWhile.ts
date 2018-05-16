import { fromGenerator } from './fromGenerator';

export function takeWhile<T>(source: Iterable<T>, predicate: (t: T) => boolean) {
    function* items() {
        for (const i of source) {
            if (predicate(i)) {
                yield i;
            }
            else {
                break;
            }
        }
    }
    return fromGenerator(items);
}