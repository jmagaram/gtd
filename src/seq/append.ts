import { fromGenerator } from './fromGenerator';

export function append<T>(source1: Iterable<T>, source2: Iterable<T>) {
    function* items() {
        yield* source1;
        yield* source2;
    }
    return fromGenerator(items);
}