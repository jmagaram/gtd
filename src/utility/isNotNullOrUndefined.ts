/**
 * User-defined type-guard for filtering out null and undefined from
 * arrays, rxjs observables, and other collections. See:
 * https://github.com/Microsoft/TypeScript/issues/16069
 */
export function isNotNullOrUndefined<T>(
  input: null | undefined | T
): input is T {
  return input != null;
}
