import { fromGenerator } from './fromGenerator';

export function windowed<T>(source: Iterable<T>, size: number): Iterable<ReadonlyArray<T>> {
    if (size <= 0) {
        throw new Error(`The window size must be 1 or bigger, but you specified ${size}.`);
    }
    function* items() {
        const window: T[] = [];
        for (const i of source) {
            if (window.push(i) === size) {
                yield window.slice(0, size);
                window.shift();
            }
        }
    }
    return fromGenerator(items);
}