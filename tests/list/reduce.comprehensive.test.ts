import { reduce } from "../../lib/list/reduce";
import { reduced } from "../../lib/list/reduced";

describe("reduce comprehensive tests", function () {
  // Test with an initial value (already covered in the original test)
  it("should reduce an Array with an initial value", function () {
    expect(reduce((acc: number, cur: number) => acc + cur, 0, [1, 2, 3, 4])).toBe(10);
  });

  // Test with no initial value
  it("should reduce an Array without an initial value", function () {
    expect(reduce((acc: number, cur: number) => acc + cur, [1, 2, 3, 4])).toBe(10);
  });

  // Test with empty collection and initial value
  it("should return the initial value for an empty Array", function () {
    expect(reduce((acc: number, cur: number) => acc + cur, 10, [])).toBe(10);
  });

  // Test with empty collection and no initial value
  it("should call the reducer with no arguments for an empty Array with no initial value", function () {
    const mockFn = jest.fn().mockReturnValue(42);
    expect(reduce(mockFn, [])).toBe(42);
    expect(mockFn).toHaveBeenCalledWith();
  });

  // Test with collection containing only one item and no initial value
  it("should return the only item without calling the reducer when collection has one item and no initial value", function () {
    const mockFn = jest.fn();
    expect(reduce(mockFn, [5])).toBe(5);
    expect(mockFn).not.toHaveBeenCalled();
  });

  // Test with collection containing only one item and an initial value
  it("should call the reducer once when collection has one item and an initial value", function () {
    const mockFn = jest.fn().mockReturnValue(15);
    expect(reduce(mockFn, 10, [5])).toBe(15);
    expect(mockFn).toHaveBeenCalledWith(10, 5);
  });

  // Test with the reduced$ functionality
  it("should terminate early when the reducer returns a reduced value", function () {
    const mockFn = jest
      .fn()
      .mockImplementationOnce((acc: number, cur: number) => acc + cur)
      .mockImplementationOnce((acc: number, cur: number) => reduced(acc + cur))
      .mockImplementationOnce((acc: number, cur: number) => acc + cur);

    expect(reduce(mockFn, 0, [1, 2, 3])).toBe(3);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  // Test that the third parameter is not passed to the reducer
  it("should not pass a third parameter to the reducer", function () {
    const mockFn = jest.fn().mockImplementation((acc: number, cur: number, third: any) => {
      expect(third).toBeUndefined();
      return acc + cur;
    });

    reduce(mockFn, 0, [1, 2, 3]);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
