let fizzBuzz = require("../fizzbuzz");

describe("test fizzbuzz", () => {
    it("test fizzbuzz ", () => {
        let res = fizzBuzz.fizzBuzz(15);
        expect(res).toEqual([1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz", 11, "fizz", 13, 14, "fizzbuzz"]);
    });

});