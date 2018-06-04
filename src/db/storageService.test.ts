import * as Rx from "rxjs";
import { take } from "rxjs/operators";
import * as UniqueId from "src/state/uniqueId";
import * as ConfigureDexie from "./configureDexie";
import * as Storage from "./storageService";

const milliseconds = (n: number) =>
  Rx.interval(n)
    .pipe(take(1))
    .toPromise();

beforeAll(() => {
  ConfigureDexie.forNode();
});

beforeEach(async () => {
  const db = Storage.createStorageService();
  await db.clearAll();
});

test("can save and load action items", async () => {
  const db = Storage.createStorageService();
  await db.saveActionItem({
    id: "1",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await db.saveActionItem({
    id: "2",
    isImportant: false,
    isComplete: false,
    title: "fix car"
  });
  const actions = await db.getAllActionItems();
  expect(actions.filter(i => i.id === "1")[0].title).toBe("call dad");
  expect(actions.filter(i => i.id === "2")[0].title).toBe("fix car");
});

test("can toggle important", async () => {
  const db = Storage.createStorageService();
  await db.saveActionItem({
    id: "1",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await db.toggleImportant("1" as UniqueId.T);
  const stored = await db.getAllActionItems();
  expect(stored.find(i => i.id === "1")!.isImportant).toBe(true);
});

test("can toggle completed", async () => {
  const db = Storage.createStorageService();
  await db.saveActionItem({
    id: "1",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await db.toggleCompleted("1" as UniqueId.T);
  const stored = await db.getAllActionItems();
  expect(stored.find(i => i.id === "1")!.isComplete).toBe(true);
});

test("can get notified of one insert", async () => {
  const db = Storage.createStorageService();
  let result: ReadonlyArray<Storage.RowChange> = [];
  const sub = db.changes$.subscribe(i => {
    result = i;
  });
  await db.saveActionItem({
    id: "3",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await milliseconds(3000);
  expect(result.length).toBe(1);
  sub.unsubscribe();
});

test("can get notified of two inserts", async () => {
  const db = Storage.createStorageService();
  let result: ReadonlyArray<Storage.RowChange> = [];
  const sub = db.changes$.subscribe(i => {
    result = i;
  });
  await db.saveActionItem({
    id: "3",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await db.saveActionItem({
    id: "4",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await milliseconds(3000);
  expect(result.length).toBe(2);
  sub.unsubscribe();
});

test("when toggle important, get proper notification promptly", async () => {
  const db = Storage.createStorageService();
  let result: ReadonlyArray<Storage.RowChange> = [];
  await db.saveActionItem({
    id: "1",
    isImportant: false,
    isComplete: false,
    title: "call dad"
  });
  await milliseconds(1000);
  const sub = db.changes$.subscribe(i => {
    result = i;
  });
  await db.toggleImportant("1" as UniqueId.T);
  await milliseconds(1000);
  expect(result.length).toBe(1);
  sub.unsubscribe();
});
