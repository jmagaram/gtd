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