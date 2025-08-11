import { eq$ } from "../../generic/eq$";
export class _Collection {
    constructor(set) {
        this.set = set;
    }
    get source() {
        return this.set;
    }
    get empty$() {
        // @ts-ignore
        return eq$(this.count, 0);
    }
}
