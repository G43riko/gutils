import { expect } from "chai";
import "mocha";
import { SlovakStemmer } from "./SlovakStemmer";

describe("SlovakStemmer", () => {
    describe("Stemme", () => {
        it("It should remove ends of words", () => {
            expect(SlovakStemmer.steme("rybárove")).to.be.equal("rybár");
            expect(SlovakStemmer.steme("rybárovích")).to.be.equal("rybár");
            expect(SlovakStemmer.steme("rybárova")).to.be.equal("rybár");
            expect(SlovakStemmer.steme("rybárovi")).to.be.equal("rybár");
            expect(SlovakStemmer.steme("rybárov")).to.be.equal("rybár");
            expect(SlovakStemmer.steme("rybáry")).to.be.equal("rybár");

            expect(SlovakStemmer.steme("Jakub")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakub")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakubovi")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakubom")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakubov")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakuba")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakubovi")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakubom")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakuboch")).to.be.equal("Jakub");
            expect(SlovakStemmer.steme("Jakubmi")).to.be.equal("Jakub");

            expect(SlovakStemmer.steme("najžľaznatejšieho")).to.be.equal("žľaznat");
            expect(SlovakStemmer.steme("najžľaznatejších")).to.be.equal("žľaznat");
            expect(SlovakStemmer.steme("najžľaznatejšia")).to.be.equal("žľaznat");
            expect(SlovakStemmer.steme("zefektívnenie")).to.be.equal("zefektívn");
            // wrong "zefektívnenila" equals "zefektívn"
            expect(SlovakStemmer.steme("umožnenie")).to.be.equal("umožn");

        });
    });
});
