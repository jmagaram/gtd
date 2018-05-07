import { Pipe } from './types';

export default function pipe<T>(value: T) : Pipe<T> {
    return new PipeImplementation(value);
}

class PipeImplementation<T> implements PipeImplementation<T> {
    constructor(readonly value: T) { }

    public map<U>(fn: (v: T) => U): PipeImplementation<U> {
        return new PipeImplementation(fn(this.value));
    }
}
