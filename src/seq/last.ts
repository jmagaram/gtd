import { fold } from './fold'

export function last<T>(source: Iterable<T>): T | undefined {
    return fold<T, T | undefined>(source, undefined, (sum, next) => next);
}