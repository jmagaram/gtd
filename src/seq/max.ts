import { maxBy } from './maxBy';

export function max<T>(source: Iterable<T>): T | undefined {
    return maxBy(source, i => i);
}