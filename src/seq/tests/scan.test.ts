import { scan } from '../scan'

test("when zero items, return seed",
    () => expect(Array.from(scan([], 100, (sum, item) => sum + item))).toEqual(expect.arrayContaining([100])));

test("when several items, return seed plus accumulated results",
    () => expect(Array.from(scan([1, 2, 3], 100, (sum, item) => sum + item))).toEqual(expect.arrayContaining([100, 101, 103, 106])));

test("when one item, return seed plus one accumulation",
    () => expect(Array.from(scan([1], 100, (sum, item) => sum + item))).toEqual(expect.arrayContaining([100, 101])));
