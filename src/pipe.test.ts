import pipe from "./pipe";

test('pipe with map returns mapped value', () => expect(pipe(3).map(i=>i*3).value).toBe(9));
test('pipe with no map returns original value', () => expect(pipe(3).value).toBe(3));