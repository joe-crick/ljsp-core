import { shuffle } from "../../lib/list/shuffle";
import * as fc from "fast-check";

describe("shuffle property-based tests", () => {
  it("should return an array with the same length as the input array", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        const shuffled = shuffle(arr);
        return shuffled.length === arr.length;
      })
    );
  });

  it("should return a new array (not the same reference)", () => {
    fc.assert(
      fc.property(fc.array(fc.anything(), { minLength: 1 }), (arr) => {
        const shuffled = shuffle(arr);
        return shuffled !== arr;
      })
    );
  });

  it("should contain all the same elements as the input array", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const shuffled = shuffle(arr);
        
        // Create frequency maps for both arrays
        const originalFreq = new Map();
        const shuffledFreq = new Map();
        
        for (const item of arr) {
          originalFreq.set(item, (originalFreq.get(item) || 0) + 1);
        }
        
        for (const item of shuffled) {
          shuffledFreq.set(item, (shuffledFreq.get(item) || 0) + 1);
        }
        
        // Check if both maps have the same keys and values
        if (originalFreq.size !== shuffledFreq.size) {
          return false;
        }
        
        for (const [key, count] of originalFreq.entries()) {
          if (shuffledFreq.get(key) !== count) {
            return false;
          }
        }
        
        return true;
      })
    );
  });

  it("should preserve the original array (not modify it)", () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const arrCopy = [...arr];
        shuffle(arr);
        
        // Check if the original array is unchanged
        if (arr.length !== arrCopy.length) {
          return false;
        }
        
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== arrCopy[i]) {
            return false;
          }
        }
        
        return true;
      })
    );
  });

  it("should produce a different permutation for arrays with sufficient elements", () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), { minLength: 5 }), (arr) => {
        // For arrays with at least 5 elements, the probability of getting
        // the same permutation by chance is very low
        const shuffled = shuffle(arr);
        
        // If arrays are identical in content and order, they're not shuffled
        let allSamePosition = true;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] !== shuffled[i]) {
            allSamePosition = false;
            break;
          }
        }
        
        return !allSamePosition;
      })
    );
  });

  // Edge cases
  it("should handle empty arrays", () => {
    const result = shuffle([]);
    expect(result).toEqual([]);
    expect(result).not.toBe([]);  // Should be a new array
  });

  it("should return a copy of the array for single-element arrays", () => {
    fc.assert(
      fc.property(fc.anything(), (value) => {
        const arr = [value];
        const shuffled = shuffle(arr);
        return shuffled.length === 1 && 
               shuffled[0] === value && 
               shuffled !== arr;
      })
    );
  });

  it("should handle arrays with duplicate elements", () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 1, max: 10 }), { minLength: 10 }), (arr) => {
        // This will likely create arrays with duplicate elements
        const shuffled = shuffle(arr);
        
        // Create frequency maps
        const originalFreq = new Map();
        const shuffledFreq = new Map();
        
        for (const item of arr) {
          originalFreq.set(item, (originalFreq.get(item) || 0) + 1);
        }
        
        for (const item of shuffled) {
          shuffledFreq.set(item, (shuffledFreq.get(item) || 0) + 1);
        }
        
        // Check if both maps have the same keys and values
        if (originalFreq.size !== shuffledFreq.size) {
          return false;
        }
        
        for (const [key, count] of originalFreq.entries()) {
          if (shuffledFreq.get(key) !== count) {
            return false;
          }
        }
        
        return true;
      })
    );
  });
});