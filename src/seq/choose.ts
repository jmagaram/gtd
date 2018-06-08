import { Some } from "../utility/option";
import { fromGenerator } from "./fromGenerator";

export function choose<T, U extends Some>(
  source: Iterable<T>,
  chooser: (item: T) => U | undefined
) {
  function* items() {
    for (const i of source) {
      const x = chooser(i);
      if (x !== undefined) {
        yield x;
      }
    }
  }
  return fromGenerator(items);
}

// tslint:disable-next-line:variable-name
export const choose_ = <T, U extends Some>(
  chooser: (item: T) => U | undefined
) => (source: Iterable<T>) => choose(source, chooser);
