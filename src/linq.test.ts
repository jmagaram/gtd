import { pipe } from './pipe';
import * as Linq from './linq';

test("filter", () => {
    let source = [1, 2, 3];
    let result = pipe(
        () => [1, 2, 3],
        i => Linq.filter(j => j != 2, i),
        Linq.toArray);
    expect(result).toEqual([1, 3]);
});
