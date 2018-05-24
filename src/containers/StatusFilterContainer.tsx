import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import { factory as actionFactory } from 'src/actions'
import * as StatusFilterComponent from 'src/components/StatusFilterComponent'
import * as StatusFilter from 'src/state/statusFilter'
import * as Store from 'src/store'
import { connectPropsToObservable } from '../reactUtility/connectPropsToObservable';

interface TProperties {
    store: Store.T
}

function mapPropsToObservable(p: TProperties): Rx.Observable<StatusFilterComponent.Properties> {
    const onSet = (s: StatusFilter.T) => p.store.dispatch(actionFactory.view_setStatusFilter(s))
    return p.store.state$.pipe(
        map(i => i.view.status),
        distinctUntilChanged(),
        map(i => ({
            currentFilter: i,
            onSet
        })));
}

export const T = connectPropsToObservable(StatusFilterComponent.T, mapPropsToObservable);