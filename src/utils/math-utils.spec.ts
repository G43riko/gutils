import { expect } from "chai";
import "mocha";
import * as MathUtils from "./math-utils";

describe("Math utils", () => {
    describe("Pad", () => {
        it("test pad function", () => {
            expect(MathUtils.pad(1, 3)).to.equal("001");
            expect(MathUtils.pad(321, 4)).to.equal("0321");
            expect(MathUtils.pad(1234, 3)).to.equal("234");
        });
    });
    describe("RoundToDecimal", () => {
        it("Returns decimal number rounded off to N decimal places", () => {
            expect(MathUtils.roundToDecimals(1, 5)).to.equal("1.00000");
            expect(MathUtils.roundToDecimals(1.00000000001, 5)).to.equal("1.00000");
            expect(MathUtils.roundToDecimals(1.000009, 5, "floor")).to.equal("1.00000");
            expect(MathUtils.roundToDecimals(1.000009, 4, "floor")).to.equal("1.0000");
            expect(MathUtils.roundToDecimals(1.000001, 5, "ceil")).to.equal("1.00001");
            expect(MathUtils.roundToDecimals(1.000001, 4, "ceil")).to.equal("1.0001");
            expect(MathUtils.roundToDecimals(1.000005, 5)).to.equal("1.00001");
            expect(MathUtils.roundToDecimals(1.000005, 4)).to.equal("1.0000");
        });
    });
    describe("Average", () => {
        it("test average function", () => {
            expect(isNaN(MathUtils.average([]))).to.be.true;
            expect(MathUtils.average([1])).to.equal(1);
            expect(MathUtils.average([1, 2, 3])).to.equal(2);
            expect(MathUtils.average([2, 2, 2])).to.equal(2);
            expect(MathUtils.average([2.5, 8.6, 3.9])).to.equal(5);
        });
    });
    describe("Clamp", () => {
        it("test clamp function", () => {
            expect(MathUtils.clamp(15, 10, 20)).to.be.equal(15);
            expect(MathUtils.clamp(5, 10, 20)).to.be.equal(10);
            expect(MathUtils.clamp(25, 10, 20)).to.be.equal(20);
            expect(MathUtils.clamp(10, 10, 20)).to.be.equal(10);
            expect(MathUtils.clamp(20, 10, 20)).to.be.equal(20);
        });
    });
    describe("Lerp", () => {
        it("test lerp function", () => {
            expect(MathUtils.lerp(0, 10, 0)).to.be.equal(0);
            expect(MathUtils.lerp(0, 10, 1)).to.be.equal(10);
            expect(MathUtils.lerp(0, 10, 0.5)).to.be.equal(5);
        });
    });
    describe("Lamp", () => {
        it("test lamp function", () => {
            expect(MathUtils.lamp(0, 10, 0)).to.be.equal(0);
            expect(MathUtils.lamp(0, 10, 1)).to.be.equal(10);
            expect(MathUtils.lamp(0, 10, 0.5)).to.be.equal(5);
        });
    });
    describe("Diff", () => {
        it("test diff function", () => {
            expect(MathUtils.diff(0, 10)).to.be.equal(10);
            expect(MathUtils.diff(10, 0)).to.be.equal(10);
            expect(MathUtils.diff(10, 10)).to.be.equal(0);
            expect(MathUtils.diff(0, 0)).to.be.equal(0);
        });
    });
    describe("Log2", () => {
        it("test log2 function", () => {
            expect(MathUtils.log2i(1)).to.be.equal(0);
            expect(MathUtils.log2i(2)).to.be.equal(1);
            expect(MathUtils.log2i(4)).to.be.equal(2);
            expect(MathUtils.log2i(8)).to.be.equal(3);
            expect(MathUtils.log2i(16)).to.be.equal(4);
            expect(MathUtils.log2i(32)).to.be.equal(5);
            expect(MathUtils.log2i(64)).to.be.equal(6);
            expect(MathUtils.log2i(128)).to.be.equal(7);
        });
    });
    describe("BinomialCoefficient", () => {
        it("test binomialCoefficient function", () => {
            // should test (0, 1) to equal 1
            expect(MathUtils.binomialCoefficient(1, 5)).to.be.equal(0);
            expect(MathUtils.binomialCoefficient(1, 1)).to.be.equal(1);
            expect(MathUtils.binomialCoefficient(2, 1)).to.be.equal(2);
            expect(MathUtils.binomialCoefficient(2, 2)).to.be.equal(1);
            expect(MathUtils.binomialCoefficient(3, 1)).to.be.equal(3);
            expect(MathUtils.binomialCoefficient(3, 2)).to.be.equal(3);
            expect(MathUtils.binomialCoefficient(3, 3)).to.be.equal(1);
        });
    });
    describe("BinomialCoefficient", () => {
        it("Should return random value from given interval", () => {
            for (let i = 0; i < 1000; i++) {
                const min = MathUtils.randomInt(0, 1000);
                const max = MathUtils.randomInt(1000, 1000000);
                expect(min < max).to.be.true;

                const result = MathUtils.random(min, max);
                expect(min < result).to.be.true;
                expect(result < max).to.be.true;

            }
        });
    });
});
