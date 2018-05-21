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

// tslint:disable-next-line:variable-name
export const collect_ = <T, U>(selector: (item: T) => Iterable<U>) => (source: Iterable<T>) => collect(source, selector);