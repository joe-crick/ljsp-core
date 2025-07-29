import { reduce } from "../../lib/list/reduce";
import * as fc from "fast-check";

describe("reduce property-based tests", function () {
  // Test that reduce with an initial value behaves like Array.reduce
  it("should behave like Array.reduce with an initial value", function () {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.integer(), function (arr, initial) {
        // @ts-ignore
        const reduceFn = (acc, cur) => acc + cur;
        const result = reduce(reduceFn, initial, arr);
        const expected = arr.reduce(reduceFn, initial);
        return result === expected;
      })
    );
  });

  // Test that reduce without an initial value behaves like Array.reduce
  it("should behave like Array.reduce without an initial value", function () {
    fc.assert(
      fc.property(fc.array(fc.integer(), { minLength: 1 }), function (arr) {
        // @ts-ignore
        const reduceFn = (acc, cur) => acc + cur;
        const result = reduce(reduceFn, arr);
        const expected = arr.reduce(reduceFn);
        return result === expected;
      })
    );
  });

  // Test that reduce with an empty array and initial value returns the initial value
  it("should return the initial value for an empty array", function () {
    fc.assert(
      fc.property(fc.integer(), function (initial) {
        // @ts-ignore
        const reduceFn = (acc, cur) => acc + cur;
        const result = reduce(reduceFn, initial, []);
        return result === initial;
      })
    );
  });

  // Test that reduce preserves the identity function with primitive values
  it("should preserve the identity function with primitive values", function () {
    fc.assert(
      fc.property(fc.array(fc.oneof(fc.integer(), fc.string(), fc.boolean())), function (arr) {
        // @ts-ignore
        const identityFn = (acc, cur) => acc;
        const result = arr.length > 0 ? reduce(identityFn, arr) : true;
        const expected = arr.length > 0 ? arr[0] : true;
        return result === expected;
      })
    );
  });

  // Test that reduce is associative with associative operations
  it("should be associative with associative operations", function () {
    fc.assert(
      fc.property(fc.array(fc.integer(), { minLength: 1 }), function (arr) {
        // Addition is associative
        // @ts-ignore
        const addFn = (acc, cur) => acc + cur;

        // Reduce from left to right
        const leftToRight = reduce(addFn, 0, arr);

        // Reduce from right to left
        const rightToLeft = arr.reduceRight((acc, cur) => addFn(cur, acc), 0);

        return leftToRight === rightToLeft;
      })
    );
  });
});
