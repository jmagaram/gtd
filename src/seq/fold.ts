export function fold<T, TSum>(
  source: Iterable<T>,
  seed: TSum,
  accumulator: (sum: TSum, item: T) => TSum
): TSum {
  let total = seed;
  for (const i of source) {
    total = accumulator(total, i);
  }
  return total;
}

// tslint:disable-next-line:variable-name
export const fold_ = <T, TSum>(
  seed: TSum,
  accumulator: (sum: TSum, item: T) => TSum
) => (source: Iterable<T>) => fold(source, seed, accumulator);
