import { first } from "../../lib/list";
import { upperCase } from "../../lib/string";
import { atf } from "../../lib/function";

describe("async thread first", () => {
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
});
