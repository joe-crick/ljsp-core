import { _Collection } from "./_meta-collection";
export class _Set extends _Collection {
    get count() {
        return this.set.size;
    }
    get(index) {
        return Array.from(this.set)[index];
    }
    append(item) {
        this.set.add(item);
    }
    prepend(item) {
        this.set = new Set([...item, ...this.set]);
    }
    appendAll(coll) {
        this.set = new Set([...this.set, ...coll]);
    }
    get empty() {
        return new Set();
    }
    clear() {
        this.set = new Set();
    }
    contains$(item) {
        return this.set.has(item);
    }
    remove(item) {
        this.set.delete(item);
    }
    removeIdx(item) {
        this.set.delete(item);
    }
    slice(base, end) {
        return new Set(Array.from(this.set).slice(base, end));
    }
}
