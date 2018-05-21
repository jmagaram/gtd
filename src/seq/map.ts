import { fromGenerator } from './fromGenerator';

export function map<T, U>(source: Iterable<T>, selector: (t: T) => U) {
    function* items() {
        for (const i of source) {
            yield selector(i);
        }
    }
    return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const map_ = <T, U>(selector: (t: T) => U) => (source: Iterable<T>) => map(source, selector);