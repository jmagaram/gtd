import { fromGenerator } from "./fromGenerator";

export function append<T>(source1: Iterable<T>, source2: Iterable<T>) {
  function* items() {
    yield* source1;
    yield* source2;
  }
  return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const append_ = <T>(source2: Iterable<T>) => (source1: Iterable<T>) =>
  append(source1, source2);
