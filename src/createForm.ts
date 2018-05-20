export interface T {
    readonly text: string;
    readonly canSubmit: boolean;
}

export function createDefault(): T {
    return {
        text: "",
        canSubmit: false
    }
}