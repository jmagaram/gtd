import { fromGenerator } from './fromGenerator';

export function truncate<T>(source: Iterable<T>, maxCount: number) {
    function* items() {
        let taken = 0;
        for (const i of source) {
            if (taken >= maxCount) {
                break;
            }
            else {
                taken++;
                yield i;
            }
        }
    }
    return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const truncate_ = <T>(maxCount: number) => (source: Iterable<T>) => truncate(source, maxCount);