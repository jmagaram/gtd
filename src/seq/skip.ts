import { fromGenerator } from './fromGenerator';

export function skip<T>(source: Iterable<T>, count: number) {
    function* items() {
        let skipped = 0;
        for (const i of source) {
            if (skipped === count) {
                yield i;
            }
            else {
                skipped++;
            }
        }
        if (skipped !== count) {
            throw new Error(`The sequence did not have at least ${count} items.`);
        }
    }
    return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const skip_ = <T>(count: number) => (source: Iterable<T>) => skip(source, count);