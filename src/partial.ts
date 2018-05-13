// Partial application of a function that takes a single object-type argument
export function partial<Args, Fixed extends Partial<Args>, Result>(fn: (args: Args) => Result, fixed: Fixed) {
    type Unspecified = { [P in Exclude<keyof Args, keyof Fixed>]: Args[P] };
    let result = (args: Unspecified) => {
        let combined = {};
        Object.assign(combined, fixed, args);
        return fn(combined as Args);
    };
    return result as ({} extends Unspecified ? () => Result : (args: Unspecified) => Result);
}