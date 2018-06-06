import * as Rx from "rxjs";
import { filter, map } from "rxjs/operators";
import { isNotNullOrUndefined } from "./isNotNullOrUndefined";

/**
 * Applies the given function to each element of the observable. Emits
 * only those items where the function returns a value that is not
 * null or undefined. This is equivalent to mapping each item of the
 * source to a U | undefined, and then filtering out everything that
 * is undefined.
 *
 * @param source The input observable.
 * @param selector A function to transform items of type T into options of type U.
 */
export const choose = <T, U>(selector: (item: T) => U | undefined) => (
  source: Rx.Observable<T>
) =>
  source.pipe(
    map(selector),
    filter(isNotNullOrUndefined)
  );
