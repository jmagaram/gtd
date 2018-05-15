import { fromGenerator } from './fromGenerator';

export function collect<T, U>(source: Iterable<T>, selector: (item: T) => Iterable<U>): Iterable<U> {
    function* items() {
        for (const i of source) {
            for (const j of selector(i)) {
                yield j;
            }
        }
    }
    return fromGenerator(items);
}