import { none } from './none'
import { zip2 } from './zip'

export const sequenceEqual = <T>(source: Iterable<NonNullable<T>>, other: Iterable<NonNullable<T>>) =>
    none(zip2(source, other), i => i[0] !== i[1]);

// tslint:disable-next-line:variable-name
export const sequenceEqual_ = <T>(other: Iterable<NonNullable<T>>) =>
    (source: Iterable<NonNullable<T>>) => sequenceEqual(source, other);