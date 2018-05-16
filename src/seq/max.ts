import { fold } from './fold';

export function max<T>(source: Iterable<T>): T | undefined {
    return fold<T, T | undefined>(source, undefined, (result, item) => result === undefined || item > result ? item : result);
}