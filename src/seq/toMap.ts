export function toMap<T, TKey, TValue>(
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