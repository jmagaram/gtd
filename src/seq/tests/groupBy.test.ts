import { pipe } from '../../utility/pipe'
import { groupBy } from '../groupBy'
import { length } from '../length'
import { map } from '../map'

test("by even or odd", () => {
    const result = pipe(
        () => [1, 2, 3, 4, 5],
        i => groupBy(i, j => j % 2 === 0 ? "even" : "odd", j => j.toString()),
        i => map(i, j => [j.key, j.values] as [string, string[]]),
        i => new Map(i)
    )();
    expect(result.get("even")).toEqual(expect.arrayContaining(["2", "4"]));
    expect(result.get("odd")).toEqual(expect.arrayContaining(["1", "3", "5"]));
});

test("when nothing, result is empty", () => {
    const result = pipe(
        () => [],
        i => groupBy(i, j => j % 2 === 0 ? "even" : "odd", j => j),
        i => map(i, j => [j.key, j.values] as [string, string[]]),
        i => length(i)
    )();
    expect(result).toBe(0);
});