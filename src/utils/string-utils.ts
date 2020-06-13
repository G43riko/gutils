import { StringCheckers } from "./string-checkers";
import { StringMap } from "../custom-types/string-map";

const accentedLowerCharacters = "ąàáäâãåæăćčĉďęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž";
const normalLowerCharacters   = "aaaaaaaaacccdeeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz";
const accentedCharacters      = accentedLowerCharacters + accentedLowerCharacters.toUpperCase();
const normalCharacters        = normalLowerCharacters + normalLowerCharacters.toUpperCase();

const validEmailRegex       = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const validPhoneNumberRegex = /^([+]|00)?[(]?[0-9]{3,4}[)]?[-\s.]?[0-9]{2,3}[-\s.]?[0-9]{2,6}([-\s.]?[0-9]{3})?$/im;

/* TODO:
    static underscore(word) {
    }
    static humanize(word) {
    }
    static dasherize(word) {
    }
    //dashCase = a-b-c-d-e
    //dotCase a.c.d.v.s.d
    //pascalCase = FooBarBaz
    //pathCase = a/b/c/d
    //snakeCase = a_b_c_d_
    static isUpper(word) {
    }
    static isLower(word) {
    }
*/

export function removeAccentedCharacters(word: string): string {
    if (!word || !word.replace) {
        return word;
    }

    return word.replace(/./g, (e: string) => {
        const index = accentedCharacters.indexOf(e);

        return index >= 0 ? normalCharacters[index] : e;
    });
}

export function toUpperSnakeCase(text: string): string {
    if (StringCheckers.isCamelCase(text)) {
        return text.replace(/([a-z])([A-Z])/g, "$1_$2")
                   .replace(/([A-Z])([A-Z])/g, "$1_$2")
                   .toUpperCase();
    }

    if (StringCheckers.isUpperSnakeCase(text)) {
        return text;
    }

    return text.replace(/(-|_| |\s)+(.)?/g, (i, u, e) => e ? "_" + e : "")
               .replace(/^_/, "")
               .toUpperCase();
}

export function toLowerSnakeCase(text: string): string {
    if (StringCheckers.isCamelCase(text)) {
        return text.replace(/([a-z])([A-Z])/g, "$1_$2")
                   .replace(/([A-Z])([A-Z])/g, "$1_$2")
                   .toLowerCase();
    }
    if (StringCheckers.isLowerSnakeCase(text)) {
        return text;
    }

    return text.replace(/(-|_| |\s)+(.)?/g, (i, u, e) => e ? "_" + e : "")
               .replace(/^_/, "")
               .toLowerCase();
}

export function toLowerCamelCase(text: string): string {
    if (StringCheckers.isLowerCamelCase(text)) {
        return text;
    }

    return text.trim()
               .replace(/([a-z])([A-Z])([A-Z])/g, "$1$2_$3")
               .replace(/([a-z])([A-Z])/g, "$1_$2")
               .toLowerCase()
               .replace(/(-|_| |\s)+(.)?/g, (math, sep, c) => c ? c.toUpperCase() : "")
               .replace(/^./, (e) => e.toLowerCase());
}

export function toUpperCamelCase(text: string): string {
    if (StringCheckers.isUpperCamelCase(text)) {
        return text;
    }

    return toCapital(toLowerCamelCase(text));
}

export function toCapital(text: string): string {
    return text.replace(/./, (e) => e.toUpperCase());
}

export function getLastPart(text: string, divider = " "): string {
    if (!text || !text.split) {
        return text;
    }
    const splitText = text.split(divider);

    return splitText[splitText.length - 1];
}

export function count(text: string, key: string): number {
    return (text.match(new RegExp(key, "g")) || []).length;
}

/**
 * @param text - text need to be repeat
 * @param count - number of iterations
 * @deprecated - use {@link String#repeat}
 */
export function repeat(text: string, count: number): string {
    return new Array(count + 1).join(text);
}

export function removeAll(text: string, words: string[]): string {
    return text.replace(new RegExp(`(${words.join("|")})`, "g"), "");
}

// TODO: need to be fixed
export function template(text: string, values: StringMap<string>, start = "{{", end = "}}"): string {
    start         = start.replace(/[-[\]()*\s]/g, "\\$&")
                         .replace(/\$/g, "\\$");
    end           = end.replace(/[-[\]()*\s]/g, "\\$&")
                       .replace(/\$/g, "\\$");
    const regexp  = new RegExp(`${start}(.+?)'${end}`, "g");
    const matches = text.match(regexp) || [];

    matches.forEach((match) => {
        const key   = match.substring(start.length, match.length - end.length)
                           .trim();
        const value = values[key];
        if (value) {
            text = text.replace(match, value);
        }
    });

    return text;
}

export function removeEmptyLines(content: string): string {
    return content.replace(/^\s*$(?:\r\n?|\n)/gm, "");
}

export function between(text: string, key1: string, key2: string): string {
    const startPos = text.indexOf(key1);
    const endPos   = text.indexOf(key2);
    if (startPos < 0 && endPos >= 0) {
        return text.substring(0, endPos);
    }

    if (endPos < 0 && startPos >= 0) {
        return text.substring(startPos + key1.length, text.length);
    }

    return text.substring(startPos + key1.length, endPos);
}

export function occurrences(text: string, key: string): number {
    return (text.match(new RegExp(key, "g")) || []).length;
}

export function collapseWhitespace(text: string): string {
    return text.replace(/[\s\uFEFF\xA0]{2,}/g, " ");
}

export function capitalize(text: string): string {
    return text.toLowerCase().replace(/^./, (char) => char.toUpperCase());
}

export function isEmpty(thisArg: string): boolean {
    return !thisArg || /^[\s\xa0]*$/.test(thisArg);
}

export function swapCase(text: string): string {
    return text.replace(/\S/g, (char) => {
        const lowerCase = char.toLowerCase();

        return lowerCase === char ? char.toUpperCase() : lowerCase;
    });
}

export function transformToBasicFormat(text: string): string {
    return collapseWhitespace(removeAccentedCharacters(text).toLowerCase()).trim();
}

export function isValidEmail(email: string): boolean {
    if (!email) {
        return false;
    }

    return validEmailRegex.test(email.trim());
}

export function getAsciiArray(thisArg: string): number[] {
    const result = [];
    for (const letter of thisArg) {
        result[result.length] = letter.charCodeAt(0);
    }

    return result;
}

export function isValidPhoneNumber(num: string): boolean {
    if (!num) {
        return false;
    }

    return validPhoneNumberRegex.test(num.trim());
}

export function toBasicForm(text: string): string {
    return removeAccentedCharacters(text.toLowerCase());
}

export function contains(text: string, substring: string): boolean {
    return !!text && removeAccentedCharacters(text.toLowerCase()).indexOf(substring) >= 0;
}

export function joinSingle(prefix: string, divider: string, postfix: string): string {
    if (postfix.startsWith(divider) && prefix.endsWith(divider)) {
        return prefix + postfix.substring(divider.length);
    }

    if (postfix.startsWith(divider) || prefix.endsWith(divider)) {
        return prefix + postfix;
    }

    return prefix + divider + postfix;
}

export function getFormattedNumber(num: string, prefix = "+421"): string {
    num = num.replace(/[( )/-]/g, "");
    if (num.startsWith("+")) {
        return num;
    }
    if (num.startsWith("00")) {
        return num.substring(2);
    }
    if (num.startsWith("09") || num.startsWith("02")) {
        return prefix + num.substring(1);
    }

    return num;
}

function fuzzy_match_simple(pattern: string, str: string): boolean {
    let patternIdx      = 0;
    let strIdx          = 0;
    const patternLength = pattern.length;
    const strLength     = str.length;

    while (patternIdx !== patternLength && strIdx !== strLength) {
        const patternChar = pattern.charAt(patternIdx)
                                   .toLowerCase();
        const strChar     = str.charAt(strIdx)
                               .toLowerCase();
        if (patternChar === strChar) {
            ++patternIdx;
        }
        ++strIdx;
    }

    return patternLength !== 0 && strLength !== 0 && patternIdx === patternLength;
}

export function replaceForAll(template: string, values: string[], placeHolder: string): string[] {
    return values.map((value) => {
        return template.replace(placeHolder, value);
    });
}