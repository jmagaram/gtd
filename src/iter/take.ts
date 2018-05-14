export function take<T>(args: { source: Iterable<T>, count: number }) {
    function* items() {
        if (args.count === 0) {
            return;
        }
        else {
            let taken = 0;
            for (const i of args.source) {
                yield i;
                taken++;
                if (taken === args.count) {
                    break;
                }
            }
            if (taken !== args.count) {
                throw new Error(`The sequence did not have at least ${args.count} items.`);
            }
        }
    }
    return { [Symbol.iterator]: items };
}

