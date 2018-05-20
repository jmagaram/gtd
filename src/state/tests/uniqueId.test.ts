import * as Seq from 'src/seq/index';
import { map } from 'src/seq/index';
import { pipe } from 'src/utility/pipe';
import * as UniqueId from '../uniqueId';

test("when create 1000, each instance is unique", () =>
    expect(pipe(
        () => Seq.init(1000),
        i => map(i, _ => UniqueId.create() as string),
        i => new Set<string>(i).size)()).toBe(1000));