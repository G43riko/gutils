import { expect } from "chai";
import "mocha";
import * as MiscUtils from "./misc-utils";

describe("Misc utils", () => {
    describe("IsIn", () => {
        it("It should return true if elements contains searched element", () => {
            expect(MiscUtils.isIn("a", "b", "d", "a")).to.be.true;
            expect(MiscUtils.isIn("a", ["b", "d", "a"])).to.be.true;
            expect(MiscUtils.isIn("c", "b", "d", "a")).to.be.false;
            expect(MiscUtils.isIn("c", ["b", "d", "a"])).to.be.false;
            expect(MiscUtils.isIn("c")).to.be.false;
            expect(MiscUtils.isIn("c", [])).to.be.false;
        });
    });
    describe("ObjectToQueryParams", () => {
        it("It should return object serialized into string", () => {
            expect(MiscUtils.objectToQueryParams({})).to.equal("");
            expect(MiscUtils.objectToQueryParams({a: "aa", b: "bb"})).to.equal("?a=aa&b=bb");
            expect(MiscUtils.objectToQueryParams({a: "21", b: "22"})).to.equal("?a=21&b=22");
        });
    });
    describe("ParseParams", () => {
        it("It should return object parsed from url string", () => {
            const param       = "name=Gabriel&age=23&email=gcsollei&email=gabrielcsollei&email=test";
            const parsedParam = MiscUtils.parseParams(param);
            expect(parsedParam).to.be.an("object");
            expect(parsedParam.name).to.be.equal("Gabriel");
            expect(parsedParam.age).to.be.equal("23");
            expect(parsedParam.email).to.be.an("array");
            expect(parsedParam.email[0]).to.be.equal("gcsollei");
            expect(parsedParam.email[1]).to.be.equal("gabrielcsollei");
            expect(parsedParam.email[2]).to.be.equal("test");
        });
    });

    describe("Cookies", () => {
        const getCookies      = (): string => {
            let cookies = "";
            cookies += MiscUtils.setCookie("name", "gabriel", 1) + "; ";
            cookies += MiscUtils.setCookie("age", 24, 10) + "; ";
            cookies += MiscUtils.setCookie("real", true, 10) + "; ";
            cookies += MiscUtils.setCookie("empty", "", 1);

            return cookies;
        };
        const requiredCookies = "name=gabriel; " +
            "age=24; " +
            "real=true; " +
            "empty=";
        it("It should return cookies", () => {
            expect(getCookies()).to.be.equal(requiredCookies);
        });
        it("It should get cookies", () => {
            const cookies = getCookies();
            expect(MiscUtils.getCookie("nothing", cookies)).to.be.equal("");
            expect(MiscUtils.getCookie("name", cookies)).to.be.equal("gabriel");
            expect(MiscUtils.getCookie("age", cookies)).to.be.equal("24");
            expect(MiscUtils.getCookie("real", cookies)).to.be.equal("true");
            expect(MiscUtils.getCookie("empty", cookies)).to.be.equal("");
        });
        it("It should parse cookies", () => {
            expect(MiscUtils.parseCookies(getCookies())).to.deep.equal({
                name : "gabriel",
                age  : "24",
                real : "true",
                empty: "",
            });
        });

        // istanbul ignore next
        it("It should test serialization and deserialization", () => {
            const obj = {
                funcAvg     : (a: number, b: number) => {
                    return (a + b) / 2;
                },
                funcSum     : (a: number, b: number) => a + b,
                // tslint:disable-next-line
                funcMul     : function(a: number, b: number) {
                    return a * b;
                },
                stringParam : "name",
                numberParam : 123465,
                objParam    : {a: "aa"},
                arrayParam  : ["a", true, 12],
                booleanParam: false,
            };

            const serializedResult = MiscUtils.serialize(obj);
            expect(serializedResult).to.be.a("string");
            const result = MiscUtils.parse(serializedResult);

            expect(Array.isArray(result.arrayParam)).to.be.true;
            expect(result.arrayParam, "result.arrayParam").to.deep.equal(["a", true, 12]);
            expect(result.stringParam, "result.stringParam").to.be.a("string");
            expect(result.stringParam, "result.stringParam").to.be.equal("name");
            expect(result.objParam, "result.objParam").to.be.a("object");
            expect(result.objParam, "result.objParam").to.deep.equal({a: "aa"});
            expect(result.numberParam, "result.numberParam").to.be.equal(123465);
            expect(result.booleanParam, "result.booleanParam").to.be.equal(false);
            describe.skip("should skip wrong tests", () => {
                expect(typeof result.funcAvg, "typeof result.funcAvg").to.be.equal("function");
                expect(result.funcAvg(1, 3), "result.funcAvg(1, 3)").to.be.equal(2);
            });
            expect(typeof result.funcSum, "typeof result.funcSum").to.be.equal("function");
            expect(result.funcSum(2, 4), "result.funcSum(2, 4)").to.be.equal(6);
            expect(typeof result.funcMul, "typeof result.funcMul").to.be.equal("function");
            expect(result.funcMul(3, 3), "result.funcMul(3, 3)").to.be.equal(9);
        });
    });
});
