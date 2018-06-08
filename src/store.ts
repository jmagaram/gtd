import * as Rx from "rxjs";
import {
  delay,
  filter,
  map,
  mergeMap,
  onErrorResumeNext,
  switchMap,
  take,
  takeUntil,
  withLatestFrom
} from "rxjs/operators";
import { ActionTypes, factory } from "src/actions";
import { createStorageService, StorageService } from "src/db/storageService";
import * as ActionItem from "src/state/actionItem";
import * as AppState from "src/state/appState";
import * as UniqueId from "src/state/uniqueId";
import * as Option from "src/utility/option";
import * as Store from "src/utility/store";
import { choose } from "./utility/rxjs/choose";

export type T = Store.Store<AppState.T, ActionTypes>;

const theDb = createStorageService();

export function createDefault() {
  const store = Store.createStore(
    AppState.createDefault(),
    AppState.reducer,
    Store.createActionDispatcher(submitAddForm(theDb)),
    Store.createActionDispatcher(hideMessagesAfterFewSeconds),
    Store.createActionDispatcher(dbToggleToDoCompleted(theDb)),
    Store.createActionDispatcher(dbToggleToDoImportant(theDb)),
    Store.createActionDispatcher(listenToDatabaseChanges(theDb)),
    Store.createActionDispatcher(deleteActionItem(theDb))
  );
  return store;
}

type Epc = Store.Epic<AppState.T, ActionTypes>;
type Ctx = Store.Context<AppState.T, ActionTypes>;

const hideMessagesAfterFewSeconds: Epc = ({ state$, action$ }) =>
  action$.pipe(
    filter(i => i.type === "error_display"),
    map(_ => Rx.of(factory.error_hide()).pipe(delay(5000))),
    switchMap(i => i)
  );

const dbToggleToDoCompleted = (db: StorageService): Epc => ({
  action$,
  state$
}: Ctx) =>
  action$.pipe(
    choose(
      i => (i.type === "actionItem_toggleComplete" ? i.payload.id : undefined)
    ),
    map(i =>
      Rx.from(
        db
          .toggleCompleted(i)
          .then(_ => undefined, err => factory.error_display("Can't do it!"))
      )
    ),
    mergeMap(i => i),
    filter(Option.isSome)
  );

const dbToggleToDoImportant = (db: StorageService): Epc => ({
  action$,
  state$
}: Ctx) =>
  action$.pipe(
    choose(
      i => (i.type === "actionItem_toggleImportant" ? i.payload.id : undefined)
    ),
    map(i =>
      Rx.from(
        db
          .toggleImportant(i)
          .then(_ => undefined, err => factory.error_display("Can't do it!"))
      )
    ),
    mergeMap(i => i),
    filter(Option.isSome)
  );

const submitAddForm = (db: StorageService): Epc => ({ action$, state$ }: Ctx) =>
  action$.pipe(
    filter(i => i.type === "createForm_submit"),
    withLatestFrom(state$),
    map(i => i[1].createForm),
    map(i => {
      let zzzz = db
        .saveActionItem({
          id: UniqueId.create(),
          isComplete: false,
          isImportant: false,
          title: i.text
        })
        .then(
          success => factory.createForm_reset(),
          err => factory.error_display("Couldn't create!")
        );
      return zzzz;
    }),
    mergeMap(i => i)
  );

const listenToDatabaseChanges = (db: StorageService): Epc => ({
  action$,
  state$
}: Ctx) => db.changes$.pipe(map(i => factory.dbUpdate(i)));

export const deleteActionItem = (db: StorageService): Epc => ({
  action$,
  state$
}: Ctx) => {
  const keysToDelete = action$.pipe(
    choose(i => (i.type === "actionItem_startPurge" ? i.payload.id : undefined))
  );
  const process = (id: UniqueId.T) =>
    Rx.timer(0, 1000).pipe(
      take(6), // 0 1 2 3 4 5
      map(i => {
        if (i < 5) {
          return Rx.of(
            factory.actionItem_updatePurgeCountdown(id, (i * 100) / 5)
          );
        } else {
          const z = Rx.from(db.deleteActionItem(id)).pipe(
            map(_ => Rx.of(factory.error_display("hack to get it to work"))),
            onErrorResumeNext(Rx.of(factory.error_display("Could not delete")))
          );
          return z;
        }
      }),
      mergeMap(jj => jj),
      takeUntil(
        action$.pipe(
          filter(
            j => j.type === "actionItem_cancelPurge" && j.payload.id === id
          )
        )
      )
    );
  const p = keysToDelete.pipe(
    map(i => process(i)),
    mergeMap(jj => jj)
  );
  return p;
};
