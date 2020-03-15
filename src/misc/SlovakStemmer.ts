function removePredpona(char: string): string {
    if (char.length > 6 && char.startsWith("naj")) {
        return char.substr(3, char.length);
    }

    return char;
}

// tslint:disable-next-line
function removeCase(key: string): string {
    const len = key.length;
    if (len > 9 && key.endsWith("ejšieho")
        || key.endsWith("ejšiemu")) {
        return key.substring(0, len - 7);
    }

    if (len > 8 && (key.endsWith("ejších") ||
        key.endsWith("encoch") ||
        key.endsWith("ejšími") ||
        key.endsWith("encami"))) {
        return key.substring(0, len - 6);
    }

    if (len > 7 && (key.endsWith("ejšia") ||
        key.endsWith("atami") ||
        key.endsWith("atách") ||
        key.endsWith("eniec") ||
        key.endsWith("encom") ||
        key.endsWith("ejšom") ||
        key.endsWith("ejším") ||
        key.endsWith("ejšej") ||
        key.endsWith("ejšou") ||
        key.endsWith("ejšiu") ||
        key.endsWith("ejšie")
    )) {
        return key.substring(0, len - 5);
    }

    if (len > 6 &&
        (key.endsWith("eťom") ||
            key.endsWith("iami") ||
            key.endsWith("atám") ||
            key.endsWith("aťom") ||
            key.endsWith("ovia") ||
            key.endsWith("iach") ||
            key.endsWith("atám") ||
            key.endsWith("ence") ||
            key.endsWith("ieho") ||
            key.endsWith("iemu") ||
            key.endsWith("ieme") ||
            key.endsWith("iete") ||
            key.endsWith("ejší") ||
            // gabos
            key.endsWith("enie"))) {
        return key.substring(0, len - 4);
    }

    if (len > 5 &&
        (key.endsWith("ich") || // From cz
            key.endsWith("eho") ||
            key.endsWith("ych") ||
            key.endsWith("ích") || // From cz
            key.endsWith("ého") || // From cz
            key.endsWith("emi") || // From cz
            key.endsWith("ému") || // From cz
            key.endsWith("emu") ||
            /*key.endsWith("iho") ||*/ // Veľmi malý vplyv
            key.endsWith("ími") || // From cz
            key.endsWith("imi") ||
            key.endsWith("ách") || // From cz
            key.endsWith("ých") || // From cz
            key.endsWith("ami") || // From cz
            /*                        key.endsWith("ové") ||
                                    key.endsWith("ový") ||
                                    key.endsWith("oví") ||*/
            key.endsWith("ovi") || // From cz
            key.endsWith("ieť") ||
            key.endsWith("ieš") ||
            key.endsWith("ejú") ||
            key.endsWith("ajú") ||
            key.endsWith("ujú") ||
            key.endsWith("ejú") ||
            key.endsWith("eme") ||
            key.endsWith("íte") ||
            key.endsWith("íme") ||
            key.endsWith("ými") || // From cz
            key.endsWith("ymi") ||
            key.endsWith("ach") ||
            key.endsWith("iam") ||
            /*key.endsWith("atá") ||*/
            key.endsWith("iac") ||
            key.endsWith("ite") ||
            key.endsWith("ili") ||
            key.endsWith("ila") ||
            key.endsWith("ilo") ||
            key.endsWith("ime") ||
            key.endsWith("och")
        )) {
        return key.substring(0, len - 3);
    }

    if (len > 4 &&
        (/*key.endsWith("ín") ||*/
            key.endsWith("ím") || // From cz
            key.endsWith("ám") || // From cz
            key.endsWith("am") ||
            key.endsWith("us") || // From cz
            key.endsWith("ým") || // From cz
            key.endsWith("ym") ||
            key.endsWith("mi") || // From cz
            key.endsWith("ou") || // From cz
            key.endsWith("om") ||
            key.endsWith("ej") ||
            key.endsWith("ov") ||
            key.endsWith("ia") ||
            key.endsWith("ie") ||
            key.endsWith("iu") ||
            key.endsWith("im") ||
            key.endsWith("ho") ||
            key.endsWith("mu") ||
            key.endsWith("me") ||
            key.endsWith("te") ||
            key.endsWith("ať") ||
            key.endsWith("aš") ||
            key.endsWith("úť") ||
            key.endsWith("iť") ||
            key.endsWith("íš") ||
            key.endsWith("iš") ||
            key.endsWith("il") ||
            key.endsWith("úc") ||
            key.endsWith("eš"))) {
        return key.substring(0, len - 2);
    }

    if (len > 3) {
        switch (key[len - 1]) {
            case "a":
            case "e":
            case "i":
            case "o":
            case "u":
            case "ú":
            /*case "ô":*/
            case "y":
            case "á":
            case "é":
            case "í":
            case "ý":
                return key.substring(0, len - 1);
        }
    }

    return key;
}

function removePossessives(s: string): string {
    const len = s.length;
    if (len > 5 && s.endsWith("in") ||
        s.endsWith("ov")) {
        return s.substr(0, len - 2);
    }

    return s;
}

function normalize(s: string): string {
    const len = s.length;
    // toto pravidlo znižuje FP ale zvyšuje FN
    /*        if (len > 1 && s[len - 2] == "i" && s[len-1]=="c") {
                s[len - 2] = s[len - 1]; // e* > *
                return len - 1;
            }*/
    switch (s[len - 1]) {
        case "c": // [cč] -> k
        case "č":
            return s.replace(/./g, (e, i) => i === len - 1 ? e : "k");
        case "ľ": // [ľ] -> l
            return s.replace(/./g, (e, i) => i === len - 1 ? e : "l");
        case "ň": // [ľ] -> l
            return s.replace(/./g, (e, i) => i === len - 1 ? e : "n");
        case "ť": // [ľ] -> l
            return s.replace(/./g, (e, i) => i === len - 1 ? e : "t");
    }

    if (len > 3 && s[len - 3] === "i" && (s[len - 2] === "e" || s[len - 2] === "a" || s[len - 2] === "u")) {
        return s.replace(/./g, (e, i) => {
            if (i === len - 3) {
                return s[len - 2];
            }
            if (i === len - 2) {
                return s[len - 1];
            }

            return e;
        });
    }

    return s;
}

export class SlovakStemmer {
    public static steme(word: string): string {
        const result = removePossessives(removeCase(removePredpona(word)));
        if (result.length) {
            return normalize(result);
        }

        return result;
    }
}
