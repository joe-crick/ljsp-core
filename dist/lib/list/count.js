// @ts-nocheck
import { Collection } from "../internal/collection";
import { void$ } from "../generic/void$";
export function count(set) {
    return void$(set) ? 0 : Collection(set, false).count;
}
