import { exactlyOne } from './exactlyOne'
import { truncate } from './truncate'

export function head<T>(source: Iterable<T>): T | undefined {
    return exactlyOne(truncate(source, 1));
}

