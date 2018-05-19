import * as React from 'react'
import { T as Importance } from 'src/importantFilter'
import * as Seq from 'src/seq'
import { pipe } from 'src/utility/pipe'

export interface Properties {
    key: string;
    title: string;
    isImportant: boolean;
    isComplete: boolean;
    onDelete: () => void;
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

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
    const titleStyle = (p.isComplete) ? completedStyle : incompleteStyle;
    const impStyle = (p.isImportant) ? importantStyle : notImportantStyle;
    const handleOnToggleImportant = (e: React.MouseEvent<HTMLButtonElement>) => p.onToggleImportant();
    const handleOnToggleComplete = (e: React.MouseEvent<HTMLSpanElement>) => p.onToggleComplete();
    const handleOnDelete = (e: React.MouseEvent<HTMLSpanElement>) => p.onDelete();

    return <p><span onClick={handleOnToggleImportant} style={impStyle}>imp</span>&nbsp;&nbsp;<span onClick={handleOnDelete}>del</span>&nbsp;&nbsp;<span onClick={handleOnToggleComplete} style={titleStyle}>{p.title}</span></p>
};