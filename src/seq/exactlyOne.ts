import * as Option from '../utility/option'
import { pipe } from '../utility/pipe'
import { T as ZeroBasedIndex } from '../utility/zeroBasedIndex'
import { last } from './last'
import { mapi_ } from './mapi'
import { truncate_ } from './truncate'

export function exactlyOne<T extends Option.Some>(source: Iterable<T>): T | undefined {
    return pipe(
        () => source,
        truncate_(2),
        mapi_((index, value) => [index, value] as [ZeroBasedIndex, T]),
        last,
        Option.filter_(i => i[0] === 0),
        Option.map_(i => i[1])
    )();
}