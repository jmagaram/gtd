import { fromGenerator } from "./fromGenerator";

export function filter<T>(
  source: Iterable<T>,
  predicate: (item: T) => boolean
) {
  function* items() {
    for (const i of source) {
      if (predicate(i)) {
        yield i;
      }
    }
  }
  return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const filter_ = <T>(predicate: (item: T) => boolean) => (
  source: Iterable<T>
) => filter(source, predicate);
