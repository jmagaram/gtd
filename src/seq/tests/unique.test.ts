import { pipe } from '../../utility/pipe'
import { unique } from '../unique'

test("many items see all unique before repeats", () => expect(Array.from(unique([1, 2, 3, 1, 2, 3]))).toEqual(expect.arrayContaining([1, 2, 3])));
test("just one item", () => expect(Array.from(unique([1]))).toEqual(expect.arrayContaining([1])));
test("repeats interspersed", () => expect(Array.from(unique([1, 1, 2, 2, 1, 3, 3, 2, 1]))).toEqual(expect.arrayContaining([1, 2, 3])));
test("empty", () => expect(Array.from(unique([]))).toEqual(expect.arrayContaining([])));
