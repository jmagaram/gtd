import * as React from 'react'
import * as ListItem from 'src/components/ActionItemListItem'

export interface Properties {
    items: ListItem.Properties[]
}

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
    return <ul>
        {p.items.map(j => (<li key={j.key}><ListItem.T title={j.title} isComplete={j.isComplete} isImportant={j.isImportant} key={j.key} onDelete={j.onDelete} onToggleComplete={j.onToggleComplete} onToggleImportant={j.onToggleImportant} /></li>))}
    </ul>;
};