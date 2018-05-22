import * as Option from '../utility/option'

export function toMap<T extends Option.Some, TKey extends Option.Some, TValue>(
    source: Iterable<T>,
    keySelector: (t: T) => TKey,
    valueSelector: (t: T) => TValue): Map<TKey, TValue[]> {
    const result: Map<TKey, TValue[]> = new Map();
    for (const i of source) {
        const key = keySelector(i);
        const value = valueSelector(i);
        const group = result.get(key);
        if (group !== undefined) {
            group.push(value);
        }
        else {
            const initialGroup: TValue[] = [value];
            result.set(key, initialGroup);
        }
    }
    return result;
}

// tslint:disable-next-line:variable-name
export const toMap_ = <T extends Option.Some, TKey extends Option.Some, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue) =>
    (source: Iterable<T>) => toMap(source, keySelector, valueSelector);