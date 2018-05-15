import { fromGenerator } from './fromGenerator';

export function init(args: { count: number }): Iterable<number> {
    function* items() {
        for (let i: number = 0; i < args.count; i++) {
            yield i;
        }
    }
    return fromGenerator(items);
}