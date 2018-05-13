import * as Tagged from './tagged';

type Email = Tagged.T<string, "email">;
type Country = Tagged.T<string, "country">;

test("can create an instance of a tagged type by casting", () => {
    const email1 = "bob@gmail.com" as Email;
    expect(email1).toBe("bob@gmail.com");
});

test("can assign tagged type to base type implicitly", () => {
    const email1: Email = "bob@gmail.com" as Email;
    const email: string = email1;
    expect(email).toBe("bob@gmail.com");
});

test("can compare tagged types of same kind", () => {
    const bob1: Email = "bob@gmail.com" as Email;
    const bob2: Email = "bob@gmail.com" as Email;
    const amy: Email = "amy@gmail.com" as Email;
    expect(bob1).toBe(bob2);
    expect(bob1).not.toBe(amy);
});

test("can't assign different tagged types to eachother", () => {
    const email1: Email = "bob@gmail.com" as Email;
    const country1: Country = "Canada" as Country;
    // email1=country1; Won't compile!
});