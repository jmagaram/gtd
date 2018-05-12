import { pipe } from './pipe';
import * as Linq from './linq';

test("filter", () => {
    let result = pipe(
        () => [1, 2, 3],
        i => Linq.filter(i, j => j != 2),
        Linq.toArray);
    expect(result).toEqual([1, 3]);
});

test("map", () => {
    let result = pipe(
        () => [1, 2, 3],
        i => Linq.map(i, j => j * 2),
        Linq.toArray);
    expect(result).toEqual([2, 4, 6]);
});
