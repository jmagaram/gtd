import * as Option from '../utility/option'
import { fold } from './fold'

export function last<T extends Option.Some>(source: Iterable<T>): T | undefined {
    return fold<T, T | undefined>(source, undefined, (sum, next) => next);
}