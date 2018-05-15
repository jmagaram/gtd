import { generatorToIteraable } from './generatorToIterable';

export function filter<T>(source: Iterable<T>, predicate: (item: T) => boolean) {
    function* items() {
        for (const i of source) {
            if (predicate(i)) {
                yield i;
            }
        }
    }
    return generatorToIteraable(items);
}