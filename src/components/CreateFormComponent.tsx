import * as React from 'react';

export interface TProperties {
    readonly onSubmit: () => void;
    readonly onTextChange: (s: string) => void;
    readonly newItemText: string;
    readonly canSubmit: boolean;
}

export const T: React.StatelessComponent<TProperties> = (p: TProperties) => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        p.onSubmit();
        e.preventDefault();
    }

    function handleTextChange(e: React.FormEvent<HTMLInputElement>): void {
        p.onTextChange(e.currentTarget.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input placeholder="new to do" type="text" value={p.newItemText} onChange={handleTextChange} />
            </label>
            <input type="submit" disabled={!p.canSubmit} value="Submit" />
        </form>
    );
}