import * as Option from '../utility/option'
import { none } from './none'
import { zip2 } from './zip'

export const sequenceEqualBy = <T, U>(source: Iterable<NonNullable<T>>, other: Iterable<NonNullable<T>>, selector: (t: T) => U) =>
    none(zip2(source, other), i => Option.map(i[0], selector) !== Option.map(i[1], selector));

// tslint:disable-next-line:variable-name
export const sequenceEqualBy_ = <T, U>(other: Iterable<NonNullable<T>>, selector: (t: T) => U) =>
    (source: Iterable<NonNullable<T>>) => sequenceEqualBy(source, other, selector);