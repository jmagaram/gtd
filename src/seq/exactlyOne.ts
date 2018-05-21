import { pipe } from '../utility/pipe'
import { T as ZeroBasedIndex } from '../utility/zeroBasedIndex'
import { last } from './last'
import { mapi_ } from './mapi'
import { truncate_ } from './truncate'

export function exactlyOne<T>(source: Iterable<T>): T | undefined {
    return pipe(
        () => source,
        truncate_(2),
        mapi_((index, item) => [index, item] as [ZeroBasedIndex, T]),
        last,
        i => (i !== undefined && i[0] === 0) ? i[1] : undefined)();
}