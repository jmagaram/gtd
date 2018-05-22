import { map as optionMap, Maybe, Some } from '../utility/option'
import { none } from './none'
import { zip2 } from './zip'

export const sequenceEqualBy = <T extends Some, U extends Some>(
    source: Iterable<T>,
    other: Iterable<T>,
    selector: (t: T) => Maybe<U>) =>
    none(zip2(source, other), i => optionMap(i[0], selector) !== optionMap(i[1], selector));

// tslint:disable-next-line:variable-name
export const sequenceEqualBy_ = <T extends Some, U extends Some>(other: Iterable<T>, selector: (t: T) => Maybe<U>) =>
    (source: Iterable<T>) => sequenceEqualBy(source, other, selector);