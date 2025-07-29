import { first } from "../../lib/list";
import { upperCase } from "../../lib/string";
import { atf } from "../../lib/function";
import * as fc from "fast-check";

describe("async thread first", () => {
  // Example-based tests
  it("runs the functions top to bottom", async () => {
    expect(
      await atf(
        "a b c d",
        upperCase,
        // @ts-ignore
        (string) => string.replace("A", "X"),
        // @ts-ignore
        (string) => string.split(" "),
        first
      )
    ).toBe("X");
  });

  it("runs asynchronous functions", async () => {
    // @ts-ignore
    const asyncUpperCase = async (s) => upperCase(s);

    expect(
      await atf(
        "a b c d",
        asyncUpperCase,
        // @ts-ignore
        (s) => s.replace("A", "X"),
        // @ts-ignore
        (s) => s.split(" "),
        first
      )
    ).toBe("X");
  });

  it("returns the input value when no functions are provided", async () => {
    const result = await atf("test value");
    expect(result).toBe("test value");
  });

  // Property-based tests
  describe("property-based tests", () => {
    it("identity property: should return the input value when no functions are provided", async () => {
      await fc.assert(
        fc.asyncProperty(fc.string(), async (value) => {
          const result = await atf(value);
          return result === value;
        })
      );
    });

    it("should apply a single function correctly", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (value) => {
          // @ts-ignore
          const double = (x) => x * 2;
          const result = await atf(value, double);
          return result === double(value);
        })
      );
    });

    it("should apply multiple functions in sequence", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (value) => {
          // @ts-ignore
          const add1 = (x) => x + 1;
          // @ts-ignore
          const multiply2 = (x) => x * 2;
          // @ts-ignore
          const subtract3 = (x) => x - 3;
          
          const result = await atf(value, add1, multiply2, subtract3);
          const expected = subtract3(multiply2(add1(value)));
          
          return result === expected;
        })
      );
    });

    it("should handle async functions correctly", async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async (value) => {
          // @ts-ignore
          const asyncAdd1 = async (x) => x + 1;
          // @ts-ignore
          const multiply2 = (x) => x * 2;
          // @ts-ignore
          const asyncSubtract3 = async (x) => x - 3;
          
          const result = await atf(value, asyncAdd1, multiply2, asyncSubtract3);
          const expected = await asyncSubtract3(multiply2(await asyncAdd1(value)));
          
          return result === expected;
        })
      );
    });

    it("should handle a mix of sync and async functions", async () => {
      await fc.assert(
        fc.asyncProperty(fc.string(), async (value) => {
          // @ts-ignore
          const asyncUpperCase = async (s) => s.toUpperCase();
          // @ts-ignore
          const addExclamation = (s) => s + "!";
          
          const result = await atf(value, asyncUpperCase, addExclamation);
          const expected = addExclamation(await asyncUpperCase(value));
          
          return result === expected;
        })
      );
    });
  });
});