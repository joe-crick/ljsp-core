import { BaseTypes } from "../enums/base-types";
/**
 * @param value
 * @returns {boolean}
 */
export function objectLike$(value) {
    const type = typeof value;
    return value != null && (type === BaseTypes.Object || type === BaseTypes.Function);
}
