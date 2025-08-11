import { filter_t, map_t, mapcat_t, remove_t, trans, Transducer } from "../../lib/function/trans";

describe("transducer functions", () => {
  describe("map_t", () => {
    it("should apply a transformation function to each element", () => {
      const doubleTransducer = map_t((x) => x * 2);
      const numbers = [1, 2, 3];
      const transducer = new Transducer().add(doubleTransducer);
      const actual = transducer.transform(numbers);
      const expected = [2, 4, 6];
      expect(actual).toEqual(expected);
    });

    it("should handle empty arrays correctly", () => {
      const doubleTransducer = map_t((x) => x * 2);
      const numbers: never[] = [];
      const transducer = new Transducer().add(doubleTransducer);
      const actual = transducer.transform(numbers);
      const expected: any[] = [];
      expect(actual).toEqual(expected);
    });
  });

  describe("filter_t", () => {
    it("should filter_t elements based on a predicate function", () => {
      const evenTransducer = filter_t((x) => x % 2 === 0);
      const numbers = [1, 2, 3, 4, 5, 6];
      const transducer = new Transducer().add(evenTransducer);
      const actual = transducer.transform(numbers);
      const expected = [2, 4, 6];
      expect(actual).toEqual(expected);
    });
    it("should handle empty arrays correctly", () => {
      const evenTransducer = filter_t((x) => x % 2 === 0);
      const numbers: never[] = [];
      const transducer = new Transducer().add(evenTransducer);
      const actual = transducer.transform(numbers);
      const expected: any[] = [];
      expect(actual).toEqual(expected);
    });
  });

  describe("remove_t", () => {
    it("should remove_t elements based on a predicate function", () => {
      const removeEvens = remove_t((x) => x % 2 === 0);
      const numbers = [1, 2, 3, 4, 5, 6];
      const transducer = new Transducer().add(removeEvens);
      const actual = transducer.transform(numbers);
      const expected = [1, 3, 5];
      expect(actual).toEqual(expected);
    });
    it("should handle empty arrays correctly", () => {
      const removeEvens = remove_t((x) => x % 2 === 0);
      const numbers: never[] = [];
      const transducer = new Transducer().add(removeEvens);
      const actual = transducer.transform(numbers);
      const expected: any[] = [];
      expect(actual).toEqual(expected);
    });
  });

  describe("mapcat_t", () => {
    it("should apply a transformation function and concatenate the results", () => {
      const splitAndFlatten = mapcat_t((str) => str.split(" "));
      const sentences = ["hello world", "trans example"];
      const transducer = new Transducer().add(splitAndFlatten);
      const actual = transducer.transform(sentences);
      const expected = ["hello", "world", "trans", "example"];
      expect(actual).toEqual(expected);
    });
    it("should handle empty arrays correctly", () => {
      const splitAndFlatten = mapcat_t((str) => str.split(" "));
      const sentences: never[] = [];
      const transducer = new Transducer().add(splitAndFlatten);
      const actual = transducer.transform(sentences);
      const expected: any[] = [];
      expect(actual).toEqual(expected);
    });
  });

  describe("Transducer class", () => {
    it("add should return the Transducer instance", () => {
      const transducer = new Transducer();
      const result = transducer.add(map_t((x) => x * 2));
      expect(result).toBe(transducer);
    });

    it("add with reducer should return the Transducer instance", () => {
      const transducer = new Transducer();
      const result = transducer.add(
        (x: number) => x % 2 === 0,
        (acc: any, val: any, next: (arg0: any, arg1: any) => any) => next(acc, val)
      );
      expect(result).toBe(transducer);
    });

    it("should compose transducers correctly", () => {
      const isEven = (x: number) => x % 2 === 0;
      const double = (x: number) => x * 2;
      const subtractOne = (x: number) => x - 1;
      // prettier-ignore
      const transducer = new Transducer()
        .add(filter_t(isEven))
        .add(map_t(double))
        .add(map_t(subtractOne));

      const numbers = [1, 2, 3, 4, 5, 6];
      const actual = transducer.transform(numbers);
      const expected = [3, 7, 11];
      expect(actual).toEqual(expected);
    });

    it("should handle add with just a composed transducer", () => {
      const transducer = new Transducer().add(map_t((x) => x * 2));

      const numbers = [1, 2, 3];
      const actual = transducer.transform(numbers);
      const expected = [2, 4, 6];
      expect(actual).toEqual(expected);
    });

    it("should handle add with just a function (default map_t reducer)", () => {
      const transducer = new Transducer().add((x: number) => x * 2);

      const numbers = [1, 2, 3];
      const actual = transducer.transform(numbers);
      const expected = [2, 4, 6];
      expect(actual).toEqual(expected);
    });

    it("should handle add with a default map_t reducer, and a composed reducer", () => {
      const transducer = new Transducer().add((x: number) => x * 2).add(filter_t((x) => x > 20));

      const numbers = [10, 20, 30];
      const actual = transducer.transform(numbers);
      const expected = [40, 60];
      expect(actual).toEqual(expected);
    });

    it("should compose a custom transducer", () => {
      const multiplyByTenTransducer = trans((accumulator, value, nextReducer) => {
        return nextReducer(accumulator, value * 10);
      });

      const transducer = new Transducer().add(multiplyByTenTransducer);

      const numbers = [1, 2, 3];

      const actual = transducer.transform(numbers);
      const expected = [10, 20, 30];

      expect(actual).toEqual(expected);
    });

    it("should compose a custom transducer with a composed transducer (filter_t)", () => {
      const multiplyByTenTransducer = trans((accumulator, value, nextReducer) => {
        return nextReducer(accumulator, value * 10);
      });

      const transducer = new Transducer().add(multiplyByTenTransducer).add(filter_t((x) => x > 20));

      const numbers = [1, 2, 3, 4, 5];

      const actual = transducer.transform(numbers);
      const expected = [30, 40, 50];

      expect(actual).toEqual(expected);
    });

    describe("compose", () => {
      it("should compose multiple transducers into a single transducer", () => {
        const double = (x: number) => x * 2;
        const isEven = (x: number) => x % 2 === 0;

        const composedTransducer = new Transducer()
          .add(
            isEven,
            (accumulator: any, value: any, nextReducer: (arg0: any, arg1: any) => any, fn: (arg0: any) => any) =>
              fn(value) ? nextReducer(accumulator, value) : accumulator
          )
          .add(
            double,
            (accumulator: any, value: any, nextReducer: (arg0: any, arg1: any) => any, fn: (arg0: any) => any) =>
              nextReducer(accumulator, fn(value))
          )
          .compose().composer;

        const numbers = [1, 2, 3, 4, 5, 6];
        const result = numbers.reduce(
          composedTransducer((acc: any[], val: any) => {
            acc.push(val);
            return acc;
          }, []),
          []
        );

        expect(result).toEqual([4, 8, 12]);
      });

      it("should compose transducers in the correct order (right-to-left)", () => {
        const addOne = (x: number) => x + 1;
        const multiplyByTwo = (x: number) => x * 2;

        const composedTransducer = new Transducer()
          .add(
            multiplyByTwo,
            (accumulator: any, value: any, nextReducer: (arg0: any, arg1: any) => any, fn: (arg0: any) => any) =>
              nextReducer(accumulator, fn(value))
          )
          .add(
            addOne,
            (accumulator: any, value: any, nextReducer: (arg0: any, arg1: any) => any, fn: (arg0: any) => any) =>
              nextReducer(accumulator, fn(value))
          )
          .compose().composer;

        const numbers = [1, 2, 3];
        const result = numbers.reduce(
          composedTransducer((acc: any[], val: any) => {
            acc.push(val);
            return acc;
          }, []),
          []
        );

        expect(result).toEqual([3, 5, 7]);
      });

      it("should handle single transducer", () => {
        const addOne = (x: number) => x + 1;

        const composedTransducer = new Transducer()
          .add(
            addOne,
            (accumulator: any, value: any, nextReducer: (arg0: any, arg1: any) => any, fn: (arg0: any) => any) =>
              nextReducer(accumulator, fn(value))
          )
          .compose().composer;

        const numbers = [1, 2, 3];
        const result = numbers.reduce(
          composedTransducer((acc: any[], val: any) => {
            acc.push(val);
            return acc;
          }, []),
          []
        );

        expect(result).toEqual([2, 3, 4]);
      });
    });
  });

  describe("trans function", () => {
    it("should create a transducer that applies the reducer", () => {
      const myReducer = (accumulator: any, value: number, nextReducer: (arg0: any, arg1: number) => any) => {
        return nextReducer(accumulator + value, value * 2);
      };

      const myTransducer = trans(myReducer);
      const nextReducer = (acc: any, val: any) => acc + val;
      const transformedReducer = myTransducer(nextReducer);

      const initialAccumulator = 10;
      const initialValue = 5;

      const actual = transformedReducer(initialAccumulator, initialValue);

      const expected = 25;
      expect(actual).toBe(expected);
    });

    it("should handle different reducer logic", () => {
      const concatReducer = (
        accumulator: any,
        value: { toString: () => any },
        nextReducer: (arg0: any, arg1: string) => any
      ) => {
        return nextReducer(accumulator + value.toString(), " ");
      };

      const concatTransducer = trans(concatReducer);
      const nextConcatReducer = (acc: any, val: any) => acc + val;
      const transformedConcatReducer = concatTransducer(nextConcatReducer);

      const actual = transformedConcatReducer("", 1);
      const expected = "1 ";

      expect(actual).toBe(expected);
    });

    it("should work with a reducer that doesn't use nextReducer", () => {
      const addReducer = (accumulator: any, value: any) => {
        return accumulator + value;
      };

      const addTransducer = trans(addReducer);
      const nextAddReducer = (acc: any, val: any) => acc + val;
      const transformedAddReducer = addTransducer(nextAddReducer);

      const actual = transformedAddReducer(5, 3);
      const expected = 8;

      expect(actual).toBe(expected);
    });
  });
});
