import { identical$ } from "../../lib/list/identical$";
import * as fc from "fast-check";

describe("identical$ property-based tests", () => {
  // Reflexivity: identical$(x, x) === true for all values except NaN
  it("should be reflexive: identical$(x, x) === true", () => {
    fc.assert(
      fc.property(fc.anything(), (value) => {
        // Skip NaN values since NaN !== NaN in JavaScript
        if (Number.isNaN(value)) {
          return true;
        }
        return identical$(value, value);
      })
    );
  });

  // Symmetry: identical$(x, y) === identical$(y, x) for all values
  it("should be symmetric: identical$(x, y) === identical$(y, x)", () => {
    fc.assert(
      fc.property(fc.anything(), fc.anything(), (x, y) => {
        return identical$(x, y) === identical$(y, x);
      })
    );
  });

  // Transitivity: if identical$(x, y) && identical$(y, z) then identical$(x, z)
  it("should be transitive: if identical$(x, y) && identical$(y, z) then identical$(x, z)", () => {
    fc.assert(
      fc.property(fc.anything(), fc.anything(), fc.anything(), (x, y, z) => {
        // If x and y are not identical, or y and z are not identical, the property is trivially true
        if (!identical$(x, y) || !identical$(y, z)) {
          return true;
        }
        // If x and y are identical, and y and z are identical, then x and z should be identical
        return identical$(x, z);
      })
    );
  });

  // Special values
  it("should handle null and undefined correctly", () => {
    expect(identical$(null, null)).toBe(true);
    expect(identical$(undefined, undefined)).toBe(true);
    expect(identical$(null, undefined)).toBe(false);
    expect(identical$(undefined, null)).toBe(false);
  });

  it("should handle NaN correctly", () => {
    expect(identical$(NaN, NaN)).toBe(false); // NaN !== NaN in JavaScript
  });

  // Objects (reference equality)
  it("should compare objects by reference, not structure", () => {
    fc.assert(
      fc.property(fc.object(), (obj) => {
        // Create a new object with the same properties
        const objCopy = { ...obj };
        // The objects should have the same structure but different references
        return !identical$(obj, objCopy);
      })
    );
  });

  it("should return true for the same object reference", () => {
    fc.assert(
      fc.property(fc.object(), (obj) => {
        // The same reference should be identical
        return identical$(obj, obj);
      })
    );
  });

  // Primitive values
  it("should correctly compare primitive values", () => {
    fc.assert(
      fc.property(
        fc.oneof(fc.integer(), fc.string(), fc.boolean()),
        fc.oneof(fc.integer(), fc.string(), fc.boolean()),
        (x, y) => {
          // For primitive values, identical$ should behave like ===
          return identical$(x, y) === (x === y);
        }
      )
    );
  });
});
