import * as Option from '../utility/option'
import { fromGenerator } from './fromGenerator';

export function uniqueBy<T extends Option.Some, U extends Option.Some>(source: Iterable<T>, selector: (t: T) => U): Iterable<T> {
    function* items() {
        const seen = new Set<U>();
        for (const i of source) {
            const key = selector(i);
            if (!seen.has(key)) {
                seen.add(key);
                yield i;
            }
        }
    }
    return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const uniqueBy_ = <T extends Option.Some, U extends Option.Some>(selector: (t: T) => U) => (source: Iterable<T>) => uniqueBy(source, selector);