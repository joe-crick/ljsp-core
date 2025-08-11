import { array$ } from "../../generic/array$";
import { eq$ } from "../../generic/eq$";
import { not } from "../../generic/not";
import { _Collection } from "./_meta-collection";
export class _Map extends _Collection {
    get count() {
        return this.set.size;
    }
    get(index) {
        return getMapItem(this.set, index);
    }
    append(item) {
        this.set.set(...item);
    }
    prepend(item) {
        this.set = new Map([...item, ...this.set]);
    }
    appendAll(coll) {
        this.set = new Map([...this.set, ...coll]);
    }
    get empty() {
        return new Map();
    }
    clear() {
        this.set = new Map();
    }
    contains$(item) {
        return this.set.has(item);
    }
    remove(item) {
        this.set.delete(array$(item) ? item[0] : item);
    }
    removeIdx(index) {
        const item = getMapItem(this.set, index);
        this.set.delete(item[0]);
    }
    slice(base, end) {
        return new Map(Array.from(this.set).slice(base, end));
    }
    indexOf(item) {
        return getIndex(this.set, item);
    }
    lastIndexOf(item) {
        return getIndex(this.set, item, true);
    }
}
function getMapItem(set, index) {
    let result = undefined;
    let x = 0;
    set.forEach((value, key) => {
        if (eq$(x, index)) {
            result = [key, value];
        }
        x++;
    });
    return result;
}
function getIndex(set, item, getFromLast = false) {
    let result = -1;
    let x = 0;
    set.forEach((value, _) => {
        if (eq$(item, value)) {
            result = x;
            if (not(getFromLast))
                return result;
        }
        x++;
    });
    return result;
}
