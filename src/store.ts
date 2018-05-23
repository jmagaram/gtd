import * as Rx from 'rxjs'
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { ActionTypes, factory } from 'src/actions'
import * as Store from 'src/reactUtility/atomDb'
import * as AppState from 'src/state/appState'

export type T = Store.T<AppState.T, ActionTypes>;

// need way to dispose every subscription
// takeUntil... with Dispose() on the store?

export function createDefault() {
    const store = Store.create(AppState.createDefault(), AppState.reducer);
    const subscription = store.action$.subscribe(i => {
        switch (i.type) {
            case "actionItem_startPurge": {
                const secondsUntilDelete = 10;
                const deleteCountdown = Rx
                    .interval(1000)
                    .pipe(
                        take(secondsUntilDelete),
                        takeUntil(store.action$.pipe(filter(j => j.type === "actionItem_cancelPurge" && j.payload.id === i.payload.id))))
                    .subscribe(elapsedIndex => {
                        store.dispatch(factory.actionItem_updatePurgeCountdown(i.payload.id, (elapsedIndex + 1) * 100 / secondsUntilDelete));
                        if (elapsedIndex === (secondsUntilDelete - 1)) {
                            store.dispatch(factory.actionItem_purge(i.payload.id));
                        }
                    });
            }
        }
    });
    return store;
}