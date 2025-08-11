// @ts-nocheck
import { notEq$ } from "../../generic/not-eq$";
import { _Collection } from "./_meta-collection";
export class _Array extends _Collection {
    slice(base, end) {
        return this.set.slice(base, end);
    }
    get empty() {
        return [];
    }
    remove(item) {
        this.set = this.set.filter((val) => notEq$(val, item));
    }
    removeIdx(index) {
        this.set.splice(index, 1);
    }
    contains$(item) {
        return this.set.includes(item);
    }
    clear() {
        this.set = [];
    }
    appendAll(coll) {
        this.set = this.set.concat(coll);
    }
    append(item) {
        this.set.push(item);
    }
    prepend(item) {
        this.set.unshift(item);
    }
    get(index) {
        return this.set[index];
    }
    get count() {
        return this.set.length;
    }
    indexOf(item) {
        return this.set.indexOf(item);
    }
    lastIndexOf(item) {
        return this.set.lastIndexOf(item);
    }
}
