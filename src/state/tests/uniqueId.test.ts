import * as Seq from '../../seq/index';
import { pipe } from '../../utility/pipe';
import * as UniqueId from '../uniqueId';

test("when create 1000, each instance is unique", () =>
    expect(pipe(
        () => Seq.init(1000),
        Seq.map_(i => UniqueId.create() as string),
        i => new Set<string>(i).size)()).toBe(1000));