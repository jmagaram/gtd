import { Maybe, Some } from '../utility/option'
import { none } from './none'
import { zip2 } from './zip'

export const sequenceEqual = <T extends Some>(source: Iterable<T>, other: Iterable<T>) =>
    none(zip2(source, other), i => i[0] !== i[1]);

// tslint:disable-next-line:variable-name
export const sequenceEqual_ = <T extends Some>(other: Iterable<T>) =>
    (source: Iterable<T>) => sequenceEqual(source, other);