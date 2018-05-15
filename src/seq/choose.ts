import { fromGenerator } from './fromGenerator';

export function choose<T, U>(source: Iterable<T>, chooser: (item: T) => U | undefined) {
    function* items() {
        for (const i of source) {
            const x = chooser(i);
            if (x !== undefined) {
                yield x;
            }
        }
    }
    return fromGenerator(items);
}