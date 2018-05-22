import * as Option from '../utility/option'

export function find<T extends Option.Some>(source: Iterable<T>, predicate: (item: T) => boolean): T | undefined {
    for (const i of source) {
        if (predicate(i)) {
            return i;
        }
    }
    return undefined;
}

// tslint:disable-next-line:variable-name
export const find_ = <T extends Option.Some>(predicate: (item: T) => boolean) => (source: Iterable<T>) => find(source, predicate);