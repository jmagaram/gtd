import * as React from 'react'
import * as Seq from 'src/seq'
import { T as Importance } from 'src/state/importantFilter'
import * as Option from 'src/utility/option'
import { pipe } from 'src/utility/pipe'

export interface Properties {
    key: string;
    title: string;
    isImportant: boolean;
    isComplete: boolean;
    purgePercentComplete?: number;
    onDelete?: () => void;
    onCancelDelete?: () => void;
    onToggleComplete: () => void;
    onToggleImportant: () => void;
}

const completedStyle: React.CSSProperties = {
    color: "#808080",
    textDecoration: "line-through",
};

const incompleteStyle: React.CSSProperties = {
};

const importantStyle: React.CSSProperties = {
    color: "#ffffff",
    backgroundColor: "#ff0000"
}

const notImportantStyle: React.CSSProperties = {
    color: "#808080",
    backgroundColor: "#ffffff"
}

const undeleteStyle: React.CSSProperties = {
    color: "#ffffff",
    backgroundColor: "green"
}

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
    const titleStyle = (p.isComplete) ? completedStyle : incompleteStyle;
    const impStyle = (p.isImportant) ? importantStyle : notImportantStyle;
    const countdownText = pipe(
        () => p.purgePercentComplete,
        Option.map_(i => `deleting...${i}%; undo`), // Intellisense here is broken. Hmmm?
        Option.reduce_<string>("") // Why need type annotation here?
    )();
    const handleOnToggleImportant = (e: React.MouseEvent<HTMLButtonElement>) => p.onToggleImportant();
    const handleOnToggleComplete = (e: React.MouseEvent<HTMLSpanElement>) => p.onToggleComplete();
    const handleOnDelete = (e: React.MouseEvent<HTMLSpanElement>) => p.onDelete!();
    const handleOnCancelDelete = (e: React.MouseEvent<HTMLSpanElement>) => p.onCancelDelete!();

    return <p><span onClick={handleOnToggleImportant} style={impStyle}>imp</span>&nbsp;&nbsp;<span style={undeleteStyle} hidden={p.purgePercentComplete === undefined} onClick={handleOnCancelDelete}>{countdownText}</span><span hidden={p.purgePercentComplete !== undefined} onClick={handleOnDelete}>delete</span>&nbsp;&nbsp;<span onClick={handleOnToggleComplete} style={titleStyle}>{p.title}</span></p>
};