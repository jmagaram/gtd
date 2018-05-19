import * as React from 'react'
import * as Seq from 'src/seq'
import { T as Status } from 'src/statusFilter'
import { pipe } from 'src/utility/pipe'

export interface Properties {
    currentFilter: Status;
    onSet: (filter: Status) => void;
}

const map: ReadonlyMap<Status, number> = new Map<Status, number>([
    ["Complete", 1],
    ["Incomplete", 2],
    ["Both", 3]]);

export const T: React.StatelessComponent<Properties> = (p: Properties) => {
    function setImportanceFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        const filter = pipe(
            () => map.entries(),
            i => Seq.find(i, j => j[1] === Number.parseInt(e.target.value)),
            i => i![0])();
        p.onSet(filter);
    }

    return <p>Status <select value={map.get(p.currentFilter)} onChange={setImportanceFilter}>
        <option value={map.get("Both")} >Any</option>
        <option value={map.get("Complete")} >Completed</option>
        <option value={map.get("Incomplete")} >Incomplete</option>
    </select></p>
};