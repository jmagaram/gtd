import * as Option from '../utility/option'
import { fold } from './fold';

export function max<T extends Option.Some>(source: Iterable<T>): T | undefined {
    return fold<T, T | undefined>(source, undefined, (result, item) => result === undefined || item > result ? item : result);
}