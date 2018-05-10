// Use to mark primitive types that have passed some form of validation. This can help
// solve the 'primitive obsession' problem by assigning strings and numbers to a specific
// sub-domain. Examples:
//
// type Email = T<string, "email">;
// type Country = T<string, "country">;
// type TaskPriority = T<number, "priority">;
//
// let email1 = "bob@gmail.com" as Email;
// let email2 = "mary@gmail.com" as Email;
// let country = "canada" as Country;
//
// email1 = email2; // OK
// country = email2; // Compile error

export type T<TValue, TTag extends string> = TValue & { _tag: TTag };
