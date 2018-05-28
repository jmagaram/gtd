import * as ConfigureDexie from './configureDexie'
import * as Storage from './storageService'

beforeAll(() => {
    ConfigureDexie.forNode();
});

beforeEach(async () => {
    const db = Storage.createStorageService();
    await db.clearAll();
});

test("can save and load action items", async () => {
    const db = Storage.createStorageService();
    await db.saveActionItem({ id: "1", isImportant: false, isComplete: false, title: "call dad" });
    await db.saveActionItem({ id: "2", isImportant: false, isComplete: false, title: "fix car" });
    const actions = await db.getAllActionItems();
    expect(actions.filter(i => i.id === "1")[0].title).toBe("call dad");
    expect(actions.filter(i => i.id === "2")[0].title).toBe("fix car");
});