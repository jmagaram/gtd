import { generatorToIteraable } from './generatorToIterable';

export function unfold<T, TState>(args: { seed: TState, generator: (state: TState) => ([T, TState] | undefined) }) {
    function* items() {
        let state: TState | undefined = args.seed;
        do {
            const next = args.generator(state);
            if (next !== undefined) {
                yield next[0];
                state = next[1];
            }
            else {
                state = undefined;
            }
        } while (state !== undefined)
    }
    return generatorToIteraable(items);
}