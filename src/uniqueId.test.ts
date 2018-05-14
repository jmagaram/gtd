import * as Iter from './iter'
import { pipe } from './pipe';
import * as UniqueId from './uniqueId';

test("when create 1000, each instance is unique", () => {
    const ids = pipe(
        () => Iter.init({ count: 1000 }),
        i => Iter.map(i, j => UniqueId.create()),
        i => Array.from(i));
    const idSet = new Set<string>(ids);
    expect(ids.length).toBe(idSet.size);
});