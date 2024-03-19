const { set, get, mutex } = require("memstorejs");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("memstore", () => {
  it("set and get", () => {
    set("foo", "bar");
    expect(get("foo")).toBe("bar");
  });
  it("must be locked", async () => {
    setTimeout(async () => {
      await mutex.lockWrite();
      await set("foo", "baz");
      expect(get("foo")).toBe("baz");
      await sleep(1000);
      expect(get("foo")).toBe("baz");
      mutex.unlock();
    }, 100);
    setTimeout(async () => {
      await mutex.lockWrite();
      await set("foo", "bar");
      await sleep(100);
      mutex.unlock();
    }, 150);

    await sleep(2000);
    expect(get("foo")).toBe("bar");
  });
});
