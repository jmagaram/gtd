import * as UniqueId from './uniqueId';
import * as Enumerable from 'linq';

test("when create 1000, each instance is unique", () =>
    expect(Enumerable
        .range(1, 1000)
        .select(i => UniqueId.create())
        .groupBy(i => i as string)
        .select(i => i.count())
        .max())
        .toBe(1));