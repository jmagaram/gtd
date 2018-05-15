import * as Seq from 'sequency'
import * as UniqueId from './uniqueId';

test("when create 1000, each instance is unique", () => {
    expect(Seq
        .range(1, 1000)
        .map(i => UniqueId.create() as string)
        .distinct()
        .count()).toBe(1000);
});