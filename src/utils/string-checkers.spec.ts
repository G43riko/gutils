import { expect } from "chai";
import "mocha";
import { StringCheckers } from "./string-checkers";
import { MockData } from "../mock-data";

describe("StringCheckers", () => {
    describe("IsCamelCase", () => {
        it("It should return true if string is camel case", () => {
            [
                ...MockData.lowerCamelCase,
                ...MockData.upperCamelCase,
            ].forEach((text) => {
                expect(StringCheckers.isCamelCase(text), `${text} is valid CamelCase`).to.be.true;
            });
            [
                ...MockData.lowerSnakeCase,
                ...MockData.upperSnakeCase,
                "HELLO_my_name_is_ChuaN",
            ].forEach((text) => {
                expect(StringCheckers.isCamelCase(text), `${text} is not valid CamelCase`).to.be.false;
            });
        });
    });
    describe("IsUpperCamelCase", () => {
        it("It should return true if string is upper camel case", () => {
            MockData.upperCamelCase.forEach((text) => {
                expect(StringCheckers.isUpperCamelCase(text), `${text} is valid UpperCamelCase`).to.be.true;
            });
            [
                ...MockData.lowerCamelCase,
                ...MockData.lowerSnakeCase,
                ...MockData.upperSnakeCase,
                "HELLO_my_name_is_ChuaN",
            ].forEach((text) => {
                expect(StringCheckers.isUpperCamelCase(text), `${text} is not valid UpperCamelCase`).to.be.false;
            });
        });
    });
    describe("IsLowerCamelCase", () => {
        it("It should return true if string is lower camel case", () => {
            MockData.lowerCamelCase.forEach((text) => {
                expect(StringCheckers.isLowerCamelCase(text), `${text} is valid LowerCamelCase`).to.be.true;
            });
            [
                ...MockData.upperCamelCase,
                ...MockData.lowerSnakeCase,
                ...MockData.upperSnakeCase,
                "HELLO_my_name_is_ChuaN",
            ].forEach((text) => {
                expect(StringCheckers.isLowerCamelCase(text), `${text} is valid LowerCamelCase`).to.be.false;
            });
        });
    });
    describe("IsSnakeCase", () => {
        it("It should return true if string is snake case", () => {
            [
                ...MockData.lowerSnakeCase,
                ...MockData.upperSnakeCase,
                "HELLO_my_name_is_ChuaN",
            ].forEach((text) => {
                expect(StringCheckers.isSnakeCase(text), `${text} is valid SnakeCase`).to.be.true;
            });
            [
                ...MockData.lowerCamelCase,
                ...MockData.upperCamelCase,
            ].forEach((text) => {
                expect(StringCheckers.isSnakeCase(text), `${text} is not valid SnakeCase`).to.be.false;
            });
        });
    });
    describe("IsUpperSnakeCase", () => {
        it("It should return true if string is upper snake case", () => {
            MockData.upperSnakeCase.forEach((text) => {
                expect(StringCheckers.isUpperSnakeCase(text), `${text} is valid UpperSnakeCase`).to.be.true;
            });
            [
                ...MockData.lowerSnakeCase,
                ...MockData.lowerCamelCase,
                ...MockData.upperCamelCase,
            ].forEach((text) => {
                expect(StringCheckers.isUpperSnakeCase(text), `${text} is valid LowerSnakeCase`).to.be.false;
            });
        });
    });
    describe("IsLowerSnakeCase", () => {
        it("It should return true if string is lower snake case", () => {
            MockData.lowerSnakeCase.forEach((text) => {
                expect(StringCheckers.isLowerSnakeCase(text), `${text} is valid LowerSnakeCase`).to.be.true;
            });
            [
                ...MockData.upperSnakeCase,
                ...MockData.lowerCamelCase,
                ...MockData.upperCamelCase,
            ].forEach((text) => {
                expect(StringCheckers.isLowerSnakeCase(text), `${text} is not valid LowerSnakeCase`).to.be.false;
            });
        });
    });
    describe("IsTimeFormat", () => {
        it("It should return true if time is in HH:mm format", () => {
            MockData.timesHHmm.forEach((time) => {
                expect(StringCheckers.isTimeFormat(time, "HH:mm"), `time ${time} is in HH:mm:ss format`).to.be.true;
            });

            [...MockData.timesHHmmss, ...MockData.timesHmm].forEach((time) => {
                expect(StringCheckers.isTimeFormat(time, "HH:mm"), `'${time}' is not valid time in HH:mm format`).to.be.false;
            });
        });
        it("It should return true if time is in H:mm format", () => {
            MockData.timesHmm.forEach((time) => {
                expect(StringCheckers.isTimeFormat(time, "H:mm"), `time ${time} is in H:mm:ss format`).to.be.true;
            });

            [...MockData.timesHHmmss].forEach((time) => {
                expect(StringCheckers.isTimeFormat(time, "H:mm"), `'${time}' is not valid time in H:mm format`).to.be.false;
            });

        });
        it("It should return true if time is in HH:mm:ss format", () => {
            MockData.timesHHmmss.forEach((time) => {
                expect(StringCheckers.isTimeFormat(time, "HH:mm:ss"), `time ${time} is in HH:mm:ss format`).to.be.true;
            });

            [...MockData.timesHmm, ...MockData.timesHHmm].forEach((time) => {
                expect(StringCheckers.isTimeFormat(time, "HH:mm:ss"), `'${time}' is not valid time in HH:mm:ss format`).to.be.false;
            });

        });
        it("It should return true if time is in required format", () => {
            expect(StringCheckers.isTimeFormat("9:9", "H:m")).to.be.true;

            expect(StringCheckers.isTimeFormat("9:09:09", "HH:mm:ss")).to.be.false;
            expect(StringCheckers.isTimeFormat("1:59:59", "HH:mm:ss")).to.be.false;
            expect(StringCheckers.isTimeFormat("9:9:9", "HH:mm:ss")).to.be.false;

        });
        it("It should return false if string is invalid time format", () => {
            MockData.invalidTimes.forEach((time) => {
                [
                    "HH:mm:ss",
                    "HH:mm",
                    "H:mm",
                    "H:m",
                ].forEach((format) => {
                    expect(StringCheckers.isTimeFormat(time, format), `'${time}' is not valid time in ${format} format`).to.be.false;
                });
            });
        });
    });
});
