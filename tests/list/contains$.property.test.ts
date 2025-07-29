import { contains$ } from "../../lib/list/contains$";
import * as fc from "fast-check";

describe("contains$ property-based tests", () => {
  // Arrays
  describe("arrays", () => {
    it("should return true if the element is in the array", () => {
      fc.assert(
        fc.property(fc.array(fc.string()), fc.string(), (arr, element) => {
          // Create an array with the element
          const arrWithElement = [...arr, element];
          return contains$(arrWithElement, element);
        })
      );
    });

    it("should return false if the element is not in the array", () => {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.string().filter((s) => s !== "uniqueElement"),
          (arr, _) => {
            // Use a unique element that's guaranteed not to be in the array
            const uniqueElement = "uniqueElement";
            return !contains$(arr, uniqueElement);
          }
        )
      );
    });

    it("should behave like the native includes method for arrays", () => {
      fc.assert(
        fc.property(fc.array(fc.string()), fc.string(), (arr, element) => {
          return contains$(arr, element) === arr.includes(element);
        })
      );
    });
  });

  // Objects
  describe("objects", () => {
    it("should return true if the key exists in the object", () => {
      fc.assert(
        fc.property(fc.dictionary(fc.string(), fc.anything()), fc.string(), (obj, key) => {
          // Create an object with the key
          const objWithKey = { ...obj, [key]: "value" };
          return contains$(objWithKey, key);
        })
      );
    });

    it("should return false if the key does not exist in the object", () => {
      fc.assert(
        fc.property(
          fc.dictionary(fc.string(), fc.anything()),
          fc.string().filter((s) => s !== "uniqueKey"),
          (obj, _) => {
            // Use a unique key that's guaranteed not to be in the object
            const uniqueKey = "uniqueKey";
            const objWithoutKey = { ...obj };
            delete objWithoutKey[uniqueKey];
            return !contains$(objWithoutKey, uniqueKey);
          }
        )
      );
    });
  });

  // Strings
  describe("strings", () => {
    it("should return true if the substring exists in the string", () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (str1, str2) => {
          // Create a string that contains str2 as a substring
          const combinedString = str1 + str2;
          return contains$(combinedString, str2);
        })
      );
    });

    it("should return false if the substring does not exist in the string", () => {
      fc.assert(
        fc.property(
          fc.string().filter((s) => !s.includes("uniqueSubstring")),
          (str) => {
            // Use a unique substring that's guaranteed not to be in the string
            const uniqueSubstring = "uniqueSubstring";
            return !contains$(str, uniqueSubstring);
          }
        )
      );
    });
  });

  // Sets
  describe("sets", () => {
    it("should return true if the element exists in the Set", () => {
      fc.assert(
        fc.property(fc.array(fc.string()), fc.string(), (arr, element) => {
          // Create a Set with the element
          const setWithElement = new Set([...arr, element]);
          return contains$(setWithElement, element);
        })
      );
    });

    it("should return false if the element does not exist in the Set", () => {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.string().filter((s) => s !== "uniqueElement"),
          (arr, _) => {
            // Use a unique element that's guaranteed not to be in the Set
            const uniqueElement = "uniqueElement";
            const setWithoutElement = new Set(arr);
            return !contains$(setWithoutElement, uniqueElement);
          }
        )
      );
    });
  });

  // Maps
  describe("maps", () => {
    it("should return true if the key exists in the Map", () => {
      fc.assert(
        fc.property(fc.array(fc.tuple(fc.string(), fc.anything())), fc.string(), (entries, key) => {
          // Create a Map with the key
          const mapWithKey = new Map([...entries, [key, "value"]]);
          return contains$(mapWithKey, key);
        })
      );
    });

    it("should return false if the key does not exist in the Map", () => {
      fc.assert(
        fc.property(
          fc.array(fc.tuple(fc.string(), fc.anything())),
          fc.string().filter((s) => s !== "uniqueKey"),
          (entries, _) => {
            // Use a unique key that's guaranteed not to be in the Map
            const uniqueKey = "uniqueKey";
            const mapWithoutKey = new Map(entries.filter(([k]) => k !== uniqueKey));
            return !contains$(mapWithoutKey, uniqueKey);
          }
        )
      );
    });
  });
});
