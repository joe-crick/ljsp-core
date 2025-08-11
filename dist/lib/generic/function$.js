import { BaseTypes } from "../enums/base-types";
export function function$(value) {
    return typeof value === BaseTypes.Function;
}
