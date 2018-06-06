import { isNotNullOrUndefined } from "../isNotNullOrUndefined";

test("removes null and undefined from number array", () => {
  const x = [1, 2, undefined, null, 6];
  expect(x.filter(isNotNullOrUndefined)).toEqual([1, 2, 6]);
});

test("removes null and undefined from string array", () => {
  const x = ["a", "b", undefined, null, "c"];
  expect(x.filter(isNotNullOrUndefined)).toEqual(["a", "b", "c"]);
});

test("removes null and undefined from object array", () => {
  const x = [{ a: 3 }, undefined, null, { b: 5 }];
  expect(x.filter(isNotNullOrUndefined)).toEqual([{ a: 3 }, { b: 5 }]);
});
