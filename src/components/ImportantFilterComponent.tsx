import * as React from 'react'
import * as Seq from 'src/seq'
import { T as Importance } from 'src/state/importantFilter'
import { pipe } from 'src/utility/pipe'

export interface Properties {
    currentFilter: Importance;
    onSet: (filter: Importance) => void;
}

const map: ReadonlyMap<Importance, number> = new Map<Importance, number>([
    ["Important", 1],
    ["NotImportant", 2],
    ["Both", 3]]);

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
    function setImportanceFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        const filter = pipe(
            () => map.entries(),
            i => Seq.find(i, j => j[1] === Number.parseInt(e.target.value)),
            i => i![0])();
        p.onSet(filter);
    }

    return <p>Important <select value={map.get(p.currentFilter)} onChange={setImportanceFilter}>
        <option value={map.get("Both")} >Any</option>
        <option value={map.get("NotImportant")} >Not Important</option>
        <option value={map.get("Important")} >Important</option>
    </select></p>
};