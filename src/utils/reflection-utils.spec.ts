import { expect } from "chai";
import "mocha";
import * as ReflectionUtils from "./reflection-utils";

describe("Reflection utils", () => {

    describe("CreateClass", () => {
        class Person {
            public constructor(public readonly name: string) {
            }

            public getName(): string {
                return "My name is " + this.name;
            }
        }

        it("It should create class by string", () => {
            const person: Person = ReflectionUtils.createClass(Person, ["Gabriel"]);
            expect(person.name).to.be.equal("Gabriel");
            expect(person.getName()).to.be.equal("My name is Gabriel");
        });
    });

});
