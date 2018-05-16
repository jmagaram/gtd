import { fromGenerator } from './fromGenerator';

export function pairwise<T>(source: Iterable<T>): Iterable<[T, T]> {
    function* items() {
        let first: T | undefined;
        let second: T | undefined;
        for (const i of source) {
            if (first === undefined) {
                first = i;
            }
            else {
                if (second === undefined) {
                    second = i;
                }
                else {
                    first = second;
                    second = i;
                }
                yield [first, second] as [T, T];
            }
        }
    }
    return fromGenerator(items);
}