import { fromGenerator } from './fromGenerator';

export function groupBy<T, TKey, TValue>(
    source: Iterable<T>,
    keySelector: (t: T) => TKey,
    valueSelector: (t: T) => TValue): Iterable<{ key: TKey, values: TValue[] }> {
    function* items() {
        const result: Map<TKey, TValue[]> = new Map();
        for (const i of source) {
            const key = keySelector(i);
            const value = valueSelector(i);
            const group = result.get(key);
            if (group === undefined) {
                const initialGroup: TValue[] = [value];
                result.set(key, initialGroup);
                yield { key, values: initialGroup }
            }
            else {
                group.push(value);
            }
        }
    }
    return fromGenerator(items);
}