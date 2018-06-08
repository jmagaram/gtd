import * as Rx from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import {
  Properties as NotificationProperties,
  T as NotificationComponent
} from "src/components/Notification";
import { connectPropsToObservable } from "src/reactUtility/connectPropsToObservable";
import * as Store from "src/store";

interface ExternalProps {
  store: Store.T;
}

const mapStateToProps = (
  store: Store.T
): Rx.Observable<NotificationProperties> =>
  store.state$.pipe(
    map(x => x.notification),
    distinctUntilChanged(),
    map(x => ({ message: x }))
  );

export const T = connectPropsToObservable(
  NotificationComponent,
  (i: ExternalProps) => mapStateToProps(i.store)
);
