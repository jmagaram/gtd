import { fromGenerator } from './fromGenerator';

export function take<T>(source: Iterable<T>, count: number) {
    function* items() {
        if (count === 0) {
            return;
        }
        else {
            let taken = 0;
            for (const i of source) {
                yield i;
                taken++;
                if (taken === count) {
                    break;
                }
            }
            if (taken !== count) {
                throw new Error(`The sequence did not have at least ${count} items.`);
            }
        }
    }
    return fromGenerator(items);
}


// tslint:disable-next-line:variable-name
export const take_ = <T>(count: number) => (source: Iterable<T>) => take(source, count);