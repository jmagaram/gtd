import { pipe } from '../../utility/pipe';
import { choose } from '../choose'

test("return items where chooser does not return undefined", () => {
    const result = pipe(
        () => [1, 2, 3, 4],
        i => choose(i, j => (j % 2 === 0) ? j.toString() : undefined),
        i => Array.from(i));
    expect(result()).toEqual(expect.arrayContaining(["2", "4"]));
});
