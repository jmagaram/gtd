import * as Seq from '../seq/index';
import { map } from '../seq/index';
import * as UniqueId from '../uniqueId';
import { pipe } from '../utility/pipe';

test("when create 1000, each instance is unique", () =>
    expect(pipe(
        () => Seq.init(1000),
        i => map(i, _ => UniqueId.create() as string),
        i => new Set<string>(i).size)()).toBe(1000));