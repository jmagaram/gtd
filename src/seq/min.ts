import { minBy } from './minBy'

export function min<T>(source: Iterable<T>): T | undefined {
    return minBy(source, i => i);
}