import { pipe } from "./pipe";

test("map1", () => expect(pipe(
    1,
    i => i * 10)).toBe(10));

test("map2", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1)).toBe(11));

test("map3", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => `text ${i}`)).toBe("text 11"));

test("map4", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => i - 7,
    i => `answer ${i}`)).toBe("answer 4"));

test("map5", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => i - 7,
    i => i + 1,
    i => `answer ${i}`)).toBe("answer 5"));

test("map6", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => i - 7,
    i => i + 1,
    i => i * 10,
    i => `answer ${i}`)).toBe("answer 50"));

test("map7", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => i - 7,
    i => i + 1,
    i => i * 10,
    i => i + 4,
    i => `answer ${i}`)).toBe("answer 54"));

test("map8", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => i - 7,
    i => i + 1,
    i => i * 10,
    i => i + 4,
    i => i - 2,
    i => `answer ${i}`)).toBe("answer 52"));

test("map9", () => expect(pipe(
    1,
    i => i * 10,
    i => i + 1,
    i => i - 7,
    i => i + 1,
    i => i * 10,
    i => i + 4,
    i => i - 2,
    i => i + 9,
    i => `answer ${i}`)).toBe("answer 61"));