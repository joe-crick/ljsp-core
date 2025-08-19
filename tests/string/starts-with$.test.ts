import { startsWith$ } from "../../lib/string/starts-with$";
import * as fc from "fast-check";

describe("startsWith$", function () {
  // Example-based tests
  it("should return true when string starts with the searchString", function () {
    expect(startsWith$("hello", "he")).toBe(true);
  });

  it("should respect the position argument", function () {
    expect(startsWith$("hello", "he", 0)).toBe(true);
    expect(startsWith$("hello", "he", 1)).toBe(false);
    expect(startsWith$("hello", "el", 1)).toBe(true);
  });

  it("should handle empty searchString as true for any position", function () {
    expect(startsWith$("abc", "", 0)).toBe(true);
    expect(startsWith$("abc", "", 2)).toBe(true);
    expect(startsWith$("abc", "", 100)).toBe(true);
  });

  it("should return false when searchString is longer than the string", function () {
    expect(startsWith$("hi", "hello")).toBe(false);
  });

  it("should treat negative position as 0", function () {
    expect(startsWith$("hello", "he", -10)).toBe(true);
  });

  it("should treat NaN position as 0", function () {
    const pos = Number("not-a-number"); // NaN
    expect(startsWith$("hello", "he", pos)).toBe(true);
  });

  it("should return false when position is beyond string length (unless searchString is empty)", function () {
    expect(startsWith$("hello", "he", 999)).toBe(false);
    expect(startsWith$("hello", "", 999)).toBe(true);
  });

  it("should work with unicode strings", function () {
    expect(startsWith$("mañana", "ma")).toBe(true);
    expect(startsWith$("😀😃😄", "😀")).toBe(true);
    expect(startsWith$("😀😃😄", "😃", 1)).toBe(false);
  });

  // Property-based tests using fast-check
  describe("property-based", function () {
    it("matches native startsWith without position", function () {
      fc.assert(
        fc.property(fc.string(), fc.string(), function (str, search) {
          return startsWith$(str, search) === str.startsWith(search);
        })
      );
    });

    it("matches native startsWith with arbitrary numeric position (including floats and extremes)", function () {
      const anyNumber = fc.oneof(
        fc.double(),
        fc.integer(),
        fc.constant(Number.NaN),
        fc.constant(Number.POSITIVE_INFINITY),
        fc.constant(Number.NEGATIVE_INFINITY)
      );
      fc.assert(
        fc.property(fc.string(), fc.string(), anyNumber, function (str, search, pos) {
          const n = Number(pos);
          return startsWith$(str, search, n) === str.startsWith(search, n);
        })
      );
    });

    it("always true when searchString is empty (matches native)", function () {
      fc.assert(
        fc.property(fc.string(), fc.oneof(fc.constant(undefined), fc.double()), function (str, pos) {
          if (pos === undefined) {
            return startsWith$(str, "") === str.startsWith("");
          }
          const n = Number(pos);
          const actual = startsWith$(str, "", n);
          const expected = str.startsWith("", n);
          return actual === expected && expected === true;
        })
      );
    });
  });
});
