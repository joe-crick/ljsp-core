// @ts-nocheck
import { array$ } from "../../generic/array$";
import { _Collection } from "./_meta-collection";
export class _Object extends _Collection {
    constructor(set) {
        super(set);
        this.keys = Object.keys(set);
        this.entries = Object.entries(set);
    }
    get count() {
        return this.keys.length;
    }
    get(index) {
        return Object.entries(this.set)[index];
    }
    append(item) {
        this.set = Object.assign(this.set, array$(item) ? { [item[0]]: item[1] } : item);
    }
    prepend(item) {
        this.set = Object.assign(array$(item) ? { [item[0]]: item[1] } : item, this.set);
    }
    appendAll(coll) {
        this.set = Object.assign(this.set, coll);
    }
    get empty() {
        return {};
    }
    clear() {
        this.set = {};
    }
    contains$(item) {
        if (array$(item)) {
            const [key, val] = item;
            const test = this.entries.find(([k, v]) => k === key && v === val);
            return Boolean(test);
        }
        else {
            return item in this.set;
        }
    }
    remove(item) {
        delete this.set[array$(item) ? item[0] : item];
    }
    removeIdx(index) {
        const key = Object.keys(this.set)[index];
        delete this.set[key];
    }
    slice(base, end) {
        return Object.fromEntries(Object.entries(this.set).slice(base, end));
    }
}
