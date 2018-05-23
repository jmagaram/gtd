import * as Option from '../utility/option'
import { uniqueBy } from './uniqueBy';

export const unique = <T extends Option.Some>(source: Iterable<T>) => uniqueBy(source, i => i);