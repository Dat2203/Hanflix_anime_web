//@ts-ignore
class Storage {
  static clear(): void {
    localStorage.clear();
  }
  static remove(storageKey: string, obj: object): void {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return;

    const list: object[] = JSON.parse(rawList);

    localStorage.setItem(
      storageKey,
      JSON.stringify(list.filter((item) => !compareTwoObject(item, obj)))
    );
  }

  static create(storageKey: string, value: object) {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) {
      return localStorage.setItem(
        storageKey,
        JSON.stringify([value]) // Save value in array
      );
    }

    const list = JSON.parse(rawList);

    list.push(value);

    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  static findOne<V extends {}>(storageKey: string, filter = {}): V | undefined {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return undefined;

    const parsedList: V[] = JSON.parse(rawList);

    if (isObjectEmpty(filter)) {
      return parsedList[0];
    }

    return parsedList.find((item) => compareTwoObject(item, filter));
  }

  static update(storageKey: string, filter: object, value: object) {
    this.remove(storageKey, filter);

    const item = this.findOne(storageKey, filter);

    const updatedItem = { ...item, ...value };

    return this.create(storageKey, updatedItem);
  }

  static find<T>(storageKey: string, filter = {}): T[] | [] {
    const rawList = localStorage.getItem(storageKey);

    if (!rawList) return [];

    const parsedList: T[] = JSON.parse(rawList);

    if (isObjectEmpty(filter)) {
      return parsedList;
    }

    return parsedList.filter((item) => compareTwoObject(item, filter));
  }
}
const isObjectEmpty = (obj: object) => {
  return JSON.stringify(obj) === "{}";
};

const compareTwoObject = <T, U extends keyof T>(obj1: T, obj2: T) => {
  let comparedCount = 0;

  const entries = Object.entries(obj2);

  for (const [key, value] of entries) {
    if (obj1[key as U] === value) {
      comparedCount++;
    }
  }
  return comparedCount === entries.length;
};

export default Storage;
