import { inc } from "../../math/inc";
import { _Collection } from "./_meta-collection";
export class _String extends _Collection {
    get count() {
        return this.set.length;
    }
    get(index) {
        return this.set[index];
    }
    append(item) {
        this.set += item;
    }
    prepend(item) {
        this.set = item + this.set;
    }
    appendAll(coll) {
        this.set += coll;
    }
    get empty() {
        return "";
    }
    clear() {
        this.set = "";
    }
    contains$(item) {
        return this.set.includes(item);
    }
    remove(item) {
        this.set = this.set.replace(item, "");
    }
    removeIdx(index) {
        this.set = this.set.slice(0, index) + this.set.slice(inc(index));
    }
    slice(base, end) {
        return this.set.slice(base, end);
    }
}
