import { pipe } from '../utility/pipe'
import { T as ZeroBasedIndex } from '../utility/zeroBasedIndex'
import { last } from './last'
import { mapi } from './mapi'
import { truncate } from './truncate'

export function exactlyOne<T>(source: Iterable<T>): T | undefined {
    return pipe(
        () => source,
        i => truncate(i, 2),
        i => mapi(i, (index, item) => [index, item] as [ZeroBasedIndex, T]),
        i => last(i),
        i => (i !== undefined && i[0] === 0) ? i[1] : undefined)();
}