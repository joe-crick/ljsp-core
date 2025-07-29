import { and } from "../conditional/and";
import { iff } from "../conditional/iff";
import { eq$ } from "../generic/eq$";
import { object$ } from "../generic/object$";
import { void$ } from "../generic/void$";
import { lt$ } from "../math/lt$";
import { first } from "./first";
import { nth } from "./nth";
import { reduced$ } from "./reduced$";

/**
 * `f` should be a function of 2 arguments. If val is not supplied,
 * returns the result of applying `f` to the first 2 items in coll, then
 * applying `f` to that result and the 3rd item, etc. If coll contains no
 * items, `f` must accept no arguments as well, and reduce returns the
 * result of calling `f` with no arguments.  If coll has only 1 item, it
 * is returned and `f` is not called. If val is supplied, returns the
 * result of applying `f` to val and the first item in coll, then
 * applying `f` to that result and the 2nd item, etc. If coll contains no
 * items, returns val and `f` is not called.
 * @param fn
 * @param val
 * @param set
 * @returns {*}
 */
export function reduce(fn: Function, val: any, set?: any[]): any {
  // Track whether an initial value was provided
  const initialValueProvided = !void$(set);

  // Ensure set is defined
  if (!initialValueProvided) {
    set = val as any[];
    val = first(set);
  }

  // At this point, set is guaranteed to be defined
  const safeSet = set as any[];
  const length = iff(void$(safeSet), 0, safeSet.length);

  // If coll contains no items and no initial value, call fn with no arguments
  if (eq$(length, 0) && !initialValueProvided) {
    return fn();
  }

  // If coll contains no items and an initial value is provided, return the initial value
  if (eq$(length, 0) && initialValueProvided) {
    return val;
  }

  // If coll has only 1 item and no initial value, return the item without calling fn
  if (eq$(length, 1) && !initialValueProvided) {
    return first(safeSet);
  }

  // Start from index 0 if initial value was provided, otherwise start from index 1
  // since the first item is already used as the initial value
  let index = initialValueProvided ? 0 : 1;

  while (lt$(index, length)) {
    if (and(object$(val), reduced$(val))) {
      return val.item;
    }
    val = fn(val, nth(safeSet, index));
    index++;
  }
  return val;
}
