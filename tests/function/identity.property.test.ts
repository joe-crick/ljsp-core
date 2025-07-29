import { identity } from "../../lib/function";
import * as fc from "fast-check";

describe("identity property-based tests", () => {
  it("should return exactly what it's given for any value", () => {
    fc.assert(
      fc.property(fc.anything(), (value) => {
        return identity(value) === value;
      })
    );
  });

  it("should work with primitive values", () => {
    fc.assert(
      fc.property(fc.oneof(fc.integer(), fc.string(), fc.boolean()), (value) => {
        return identity(value) === value;
      })
    );
  });

  it("should work with arrays", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        const result = identity(arr);
        return result === arr && result.length === arr.length;
      })
    );
  });

  it("should work with objects", () => {
    fc.assert(
      fc.property(fc.object(), (obj) => {
        const result = identity(obj);
        return result === obj && Object.keys(result).length === Object.keys(obj).length;
      })
    );
  });

  it("should handle null and undefined correctly", () => {
    expect(identity(null)).toBe(null);
    expect(identity(undefined)).toBe(undefined);
  });

  it("should handle NaN correctly", () => {
    const result = identity(NaN);
    // NaN is the only value in JavaScript that is not equal to itself
    expect(Number.isNaN(result)).toBe(true);
  });

  it("should be idempotent: identity(identity(x)) === identity(x)", () => {
    fc.assert(
      fc.property(fc.anything(), (value) => {
        // Skip NaN values since NaN !== NaN in JavaScript
        if (Number.isNaN(value)) {
          return true;
        }
        return identity(identity(value)) === identity(value);
      })
    );
  });
});