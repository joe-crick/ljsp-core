import { orEq$ } from "../../lib/generic/or-eq$";
import * as fc from "fast-check";

describe("orEq$", function () {
  // Basic example-based tests
  it("should return true if the first argument is equal to any of the other arguments", function () {
    expect(orEq$(1, 2, 3, 1)).toBe(true);
    expect(orEq$("a", "b", "a", "c")).toBe(true);
    expect(orEq$(true, false, true)).toBe(true);
  });

  it("should return false if the first argument is not equal to any of the other arguments", function () {
    expect(orEq$(1, 2, 3, 4)).toBe(false);
    expect(orEq$("a", "b", "c", "d")).toBe(false);
    expect(orEq$(true, false)).toBe(false);
  });

  // Property-based tests
  describe("property-based tests", function () {
    it("should return true when the first value is repeated in the arguments", function () {
      fc.assert(
        fc.property(fc.anything(), fc.array(fc.anything()), function (value, otherValues) {
          // Create an array with the value repeated at a random position
          const position = Math.floor(Math.random() * (otherValues.length + 1));
          const args = [...otherValues.slice(0, position), value, ...otherValues.slice(position)];
          return orEq$(value, ...args);
        })
      );
    });

    it("should return false when the first value is not present in the other arguments", function () {
      fc.assert(
        fc.property(
          fc.string(),
          fc.array(fc.string()).filter((arr) => !arr.includes("uniqueValue")),
          function (_, otherValues) {
            // Use a unique value that's guaranteed not to be in otherValues
            const uniqueValue = "uniqueValue";
            return !orEq$(uniqueValue, ...otherValues);
          }
        )
      );
    });

    it("should be reflexive: orEq$(x, x) === true", function () {
      fc.assert(
        fc.property(fc.anything(), function (value) {
          // Skip NaN values since NaN !== NaN in JavaScript
          if (Number.isNaN(value)) {
            return true;
          }
          return orEq$(value, value);
        })
      );
    });

    it("should be symmetric for two arguments: orEq$(x, y) === orEq$(y, x)", function () {
      fc.assert(
        fc.property(fc.anything(), fc.anything(), function (x, y) {
          return orEq$(x, y) === orEq$(y, x);
        })
      );
    });

    it("should return false when called with only one argument", function () {
      fc.assert(
        fc.property(fc.anything(), function (value) {
          return orEq$(value) === false;
        })
      );
    });

    it("should handle null correctly", function () {
      expect(orEq$(null, null)).toBe(true);
      expect(orEq$(null, undefined)).toBe(false);
      expect(orEq$(undefined, null)).toBe(false);
      expect(orEq$(undefined, undefined)).toBe(true);
    });

    it("should handle NaN correctly", function () {
      expect(orEq$(NaN, NaN)).toBe(false); // NaN !== NaN in JavaScript
    });
  });
});
