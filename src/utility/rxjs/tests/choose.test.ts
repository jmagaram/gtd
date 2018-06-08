import { TestScheduler } from "rxjs/testing";
import { choose } from "../choose";

test("maps and removes items where selector returns undefined", () => {
  const sch = new TestScheduler((a, e) => expect(a).toEqual(e));
  sch.run(({ cold }) => {
    const source = cold("abcdabcdabcd", { a: 1, b: 2, c: 3, d: 4 });
    const result = source.pipe(
      choose<number, string>(
        i => (i === 1 || i === 3 ? (i * 10).toString() : undefined)
      )
    );
    sch.expectObservable(result).toBe("a-c-a-c-a-c-", { a: "10", c: "30" });
  });
});
