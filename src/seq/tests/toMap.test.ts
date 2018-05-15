import { pipe } from '../../utility/pipe'
import { toMap } from '../toMap'

test("by even or odd", () => {
    const result = pipe(
        () => [1, 2, 3, 4, 5],
        i => toMap(i, j => j % 2 === 0 ? "even" : "odd", j => j.toString()))();
    expect(result.get("even")).toEqual(expect.arrayContaining(["2", "4"]));
    expect(result.get("odd")).toEqual(expect.arrayContaining(["1", "3", "5"]));
});

test("when nothing, result is empty", () => {
    const result = pipe(
        () => [],
        i => toMap(i, j => j % 2 === 0 ? "even" : "odd", j => j),
        i => i.size
    )();
    expect(result).toBe(0);
});