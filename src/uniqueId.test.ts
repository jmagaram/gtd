import * as UniqueId from './uniqueId';
import { Range } from 'immutable';

test("when create 1000, each instance is unique", () =>
    expect(
        Range(1, 10000)
            .map(() => UniqueId.create())
            .groupBy(i => i)
            .every(i => i.count() == 1))
        .toBe(true));