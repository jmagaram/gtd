import { fromGenerator } from './fromGenerator';

export function skipWhile<T>(source: Iterable<T>, predicate: (t: T) => boolean) {
    function* items() {
        let isPredicateSatisfied = false;
        for (const i of source) {
            if (!isPredicateSatisfied) {
                isPredicateSatisfied = predicate(i);
            }
            if (isPredicateSatisfied) {
                yield i;
            }
        }
    }
    return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const skipWhile_ = <T>(predicate: (item: T) => boolean) => (source: Iterable<T>) => skipWhile(source, predicate);