import * as Rx from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators';
import { factory as actionFactory } from 'src/actions'
import * as CreateFormComponent from 'src/components/CreateFormComponent'
import * as Store from 'src/store'
import { connectPropsToObservable } from '../reactUtility/connectPropsToObservable';

interface TProperties {
    store: Store.T
}

function mapPropsToObservable(p: TProperties): Rx.Observable<CreateFormComponent.TProperties> {
    const onSubmit = () => p.store.dispatch(actionFactory.createForm_submit());
    const onTextChange = (s: string) => p.store.dispatch(actionFactory.createForm_updateText(s));
    return p.store.state$.pipe(
        map(i => i.createForm),
        distinctUntilChanged(),
        map(i => ({
            onSubmit,
            onTextChange,
            newItemText: i.text,
            canSubmit: i.canSubmit
        })));
}

export const T = connectPropsToObservable(CreateFormComponent.T, mapPropsToObservable);