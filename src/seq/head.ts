import { single } from './single'
import { truncate } from './truncate'

export function head<T>(source: Iterable<T>): T | undefined {
    return single(truncate(source, 1));
}

