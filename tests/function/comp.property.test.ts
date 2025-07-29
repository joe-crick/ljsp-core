import { comp, identity } from "../../lib/function";
import * as fc from "fast-check";

describe("comp property-based tests", () => {
  // Helper functions for testing
  // @ts-ignore
  const add1 = (x) => x + 1;
  // @ts-ignore
  const multiply2 = (x) => x * 2;
  // @ts-ignore
  const subtract3 = (x) => x - 3;
  // @ts-ignore
  const toString = (x) => x.toString();

  it("should compose functions from right to left", () => {
    fc.assert(
      fc.property(fc.integer(), (value) => {
        // (x + 1) * 2 - 3
        const composed = comp(subtract3, multiply2, add1);
        const expected = subtract3(multiply2(add1(value)));
        // @ts-ignore - TypeScript doesn't understand the return type correctly
        return composed(value) === expected;
      })
    );
  });

  it("should satisfy the identity law: comp(identity, f) === f", () => {
    fc.assert(
      fc.property(fc.integer(), (value) => {
        const composed = comp(identity, add1);
        // @ts-ignore - TypeScript doesn't understand the return type correctly
        return composed(value) === add1(value);
      })
    );
  });

  it("should satisfy the identity law: comp(f, identity) === f", () => {
    fc.assert(
      fc.property(fc.integer(), (value) => {
        const composed = comp(add1, identity);
        // @ts-ignore - TypeScript doesn't understand the return type correctly
        return composed(value) === add1(value);
      })
    );
  });

  it("should be associative: comp(f, comp(g, h)) === comp(comp(f, g), h)", () => {
    fc.assert(
      fc.property(fc.integer(), (value) => {
        const left = comp(add1, comp(multiply2, subtract3));
        const right = comp(comp(add1, multiply2), subtract3);
        // @ts-ignore - TypeScript doesn't understand the return type correctly
        return left(value) === right(value);
      })
    );
  });

  it("should handle multiple arguments correctly", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        // @ts-ignore
        const sum = (x, y) => x + y;
        const composed = comp(multiply2, sum);
        const expected = multiply2(sum(a, b));
        // @ts-ignore - TypeScript doesn't understand the return type correctly
        return composed(a, b) === expected;
      })
    );
  });

  it("should handle type transformations", () => {
    fc.assert(
      fc.property(fc.integer(), (value) => {
        const composed = comp(toString, multiply2, add1);
        const expected = toString(multiply2(add1(value)));
        // @ts-ignore - TypeScript doesn't understand the return type correctly
        return composed(value) === expected;
      })
    );
  });

  it("should return arguments array when no functions are provided", () => {
    fc.assert(
      fc.property(fc.anything(), (value) => {
        const composed = comp();
        // When no functions are provided, comp returns the arguments array
        const result = composed(value);
        return Array.isArray(result) && result.length === 1 && result[0] === value;
      })
    );
  });
});
