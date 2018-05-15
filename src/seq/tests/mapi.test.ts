import { mapi } from '../mapi'

test("mapi index starts at zero when more than one item", () =>
    expect(Array.from(mapi(["a", "b", "c"], (index, value) => index))).toEqual(expect.arrayContaining([0, 1, 2])));

test("mapi index starts at zero when exactly one item", () =>
    expect(Array.from(mapi(["a"], (index, value) => index))).toEqual(expect.arrayContaining([0])));

test("mapi uses selector properly", () =>
    expect(Array.from(mapi(["a", "b"], (index, value) => [index, value]))).toEqual(expect.arrayContaining([[0, "a"], [1, "b"]])));
