import pipe from "./pipe";

it('pipe with map returns mapped value', () => expect(pipe(3).map(i=>i*3).value).toBe(9));
it('pipe with no map returns original value', () => expect(pipe(3).value).toBe(3));