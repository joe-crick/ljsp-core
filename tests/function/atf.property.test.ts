import { atf } from "../../lib/function";
import * as fc from "fast-check";

describe("atf property-based tests", () => {
  it("identity property: should return the input value when no functions are provided", async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async (value: string) => {
        const result = await atf(value);
        return result === value;
      })
    );
  });

  it("should apply a single function correctly", async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer(), async (value: number) => {
        const double = function (x: number): number {
          return x * 2;
        };
        const result = await atf(value, double);
        return result === double(value);
      })
    );
  });

  it("should apply multiple functions in sequence", async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer(), async (value: number) => {
        const add1 = function (x: number): number {
          return x + 1;
        };
        const multiply2 = function (x: number): number {
          return x * 2;
        };
        const subtract3 = function (x: number): number {
          return x - 3;
        };

        const result = await atf(value, add1, multiply2, subtract3);
        const expected = subtract3(multiply2(add1(value)));

        return result === expected;
      })
    );
  });

  it("should handle async functions correctly", async () => {
    await fc.assert(
      fc.asyncProperty(fc.integer(), async (value: number) => {
        const asyncAdd1 = async function (x: number): Promise<number> {
          return x + 1;
        };
        const multiply2 = function (x: number): number {
          return x * 2;
        };
        const asyncSubtract3 = async function (x: number): Promise<number> {
          return x - 3;
        };

        const result = await atf(value, asyncAdd1, multiply2, asyncSubtract3);
        const expected = await asyncSubtract3(multiply2(await asyncAdd1(value)));

        return result === expected;
      })
    );
  });

  it("should handle a mix of sync and async functions", async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async (value: string) => {
        const asyncUpperCase = async function (s: string): Promise<string> {
          return s.toUpperCase();
        };
        const addExclamation = function (s: string): string {
          return s + "!";
        };

        const result = await atf(value, asyncUpperCase, addExclamation);
        const expected = addExclamation(await asyncUpperCase(value));

        return result === expected;
      })
    );
  });
});