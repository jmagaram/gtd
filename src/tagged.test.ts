import * as Tagged from './tagged';

type Email = Tagged.T<string, "email">;
type Country = Tagged.T<string, "country">;

test("can create an instance of a tagged type by casting", () => {
    let email1 = <Email>"bob@gmail.com";
    expect(email1).toBe("bob@gmail.com");

    let email2 = "bob@gmail.com" as Email;
    expect(email1).toBe("bob@gmail.com");
});

test("can assign tagged type to base type implicitly", () => {
    let email1: Email = "bob@gmail.com" as Email;
    let email: string = email1;
    expect(email).toBe("bob@gmail.com");
});

test("can compare tagged types of same kind", () => {
    let bob1: Email = "bob@gmail.com" as Email;
    let bob2: Email = "bob@gmail.com" as Email;
    let amy: Email = "amy@gmail.com" as Email;
    expect(bob1).toBe(bob2);
    expect(bob1).not.toBe(amy);
});

test("can't assign different tagged types to eachother", () => {
    let email1: Email = "bob@gmail.com" as Email;
    let country1: Country = "Canada" as Country;
    // email1=country1; Won't compile!
});