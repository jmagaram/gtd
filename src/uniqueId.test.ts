import * as UniqueId from './uniqueId';
import * as Linq from './linq';
import { pipe } from './pipe';

test("when create 1000, each instance is unique", () => {
    let ids = pipe(
        () => Linq.range({ from: 1, to: 1000 }),
        i => Linq.map(i, j => UniqueId.create()),
        i => Linq.toArray(i));
    let idSet = new Set<string>(ids);
    expect(ids.length).toBe(idSet.size);
});