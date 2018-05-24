import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import { factory as actionFactory } from 'src/actions'
import * as ImportantFilterComponent from 'src/components/ImportantFilterComponent'
import * as ImportantFilter from 'src/state/importantFilter'
import * as Store from 'src/store'
import { connectPropsToObservable } from '../reactUtility/connectPropsToObservable';

interface TProperties {
    store: Store.T
}

function mapPropsToObservable(p: TProperties): Rx.Observable<ImportantFilterComponent.Properties> {
    const onSet = (f: ImportantFilter.T) => p.store.dispatch(actionFactory.view_setImportantFilter(f))
    return p.store.state$.pipe(
        map(i => i.view.important),
        distinctUntilChanged(),
        map(i => ({
            currentFilter: i,
            onSet
        })));
}

export const T = connectPropsToObservable(ImportantFilterComponent.T, mapPropsToObservable);