export function generatorToIteraable<T = any>(factory: () => Iterator<T>): Iterable<T> {
    return {
        [Symbol.iterator]() {
            return factory()
        }
    }
}