import * as React from 'react';
import * as ImportantFilter from 'src/containers/ImportantFilterContainer'
import * as StatusFilter from 'src/containers/StatusFilterContainer'
import * as Store from 'src/store'

interface Props {
    store: Store.T
}

export const T: React.StatelessComponent<Props> = (p: Props) => {
    return <div>
        <ImportantFilter.T store={p.store} />
        <StatusFilter.T store={p.store} />
    </div >;
};