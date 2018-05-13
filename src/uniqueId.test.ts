import * as Linq from './linq';
import { pipe } from './pipe';
import * as UniqueId from './uniqueId';

test("when create 1000, each instance is unique", () => {
    const ids = pipe(
        () => Linq.range({ from: 1, to: 1000 }),
        i => Linq.map(i, j => UniqueId.create()),
        i => Linq.toArray(i));
        const idSet = new Set<string>(ids);
    expect(ids.length).toBe(idSet.size);
});