import { fold } from './fold'

export function length<T>(source: Iterable<T>): number {
    return fold(source, 0, (sum, item) => sum + 1);
}

