import { BaseTypes } from "../enums/base-types";

/**
 * @param value
 * @returns {boolean}
 */
export function object$(value: any) {
  const type = typeof value;
  return value != null && !Array.isArray(value) && type === BaseTypes.Object;
}
