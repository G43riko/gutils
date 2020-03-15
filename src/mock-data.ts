// tslint:disable:completed-docs
export class MockData {
    public static readonly timesHHmmss: string[] = [
        "12:00:00",
        "01:09:09",
        "23:59:59",
        "00:59:59",
        "23:01:01",
    ];

    public static readonly timesHHmm: string[] = [
        "12:53",
        "12:00",
        "01:09",
        "23:59",
        "00:59",
        "23:01",
    ];

    public static readonly timesHmm: string[] = [
        "1:59",
        "9:09",
        "9:09",
    ];

    public static readonly invalidTimes: string[] = [
        "24:00",
        "24:13:56",
        "12:61",
        "12:60",
        "12:59:60",
        "30:61",
        "12:12:61",
        "12:61:61",
        "30:61:61",
    ];

    public static readonly charactersString = "+=§,.-?:_\"!)/()<>*\'$[]}{*&^%$#@!/\\|#&@{}^'`][~\|€¶←↓→º’‘©><§®ª`←'↓&×÷|÷×";

    public static readonly characters = MockData.charactersString.split("");

    public static readonly charactersCaseAbleString = "þÞıŦŧŊEĐđNΩ";

    public static readonly charactersCaseAble: string[] = MockData.charactersCaseAbleString.split("");

    public static readonly charactersEmpty: string[] = [
        "     ",
        "    ",
        "",
        " ",
        "\t",
        "\xa0",
        "\t \xa0\t \xa0",
        "  ",
        "\t\t",
        "\xa0\xa0",
    ];

    public static readonly charactersNotEmpty: string[] = [
        " 3 ",
        "a",
        "0",
        "[]",
        "A",
        "{}",
        ".",
        "123",
        "gabriel",
        "Ich bin Hanz",
        "@",
        // "123@123.123",
        "00000000000000000000",
        "\\",
        "/",
        "********",
        "______",
    ];

    public static readonly numbersString = "0123456789";

    public static readonly numbers = MockData.numbersString.split("");

    public static readonly randomArray: any[] = [
        "a",
        1,
        2.32,
        true,
        (a: any, b: any) => a + b,
        {},
        null,
        undefined,
        Infinity,
        NaN,
        {a: "aa", b: "bb"},
        ["a", 1, true],
    ];

    public static readonly stringHelloWorldIAmComputer: string[] = [
        "Hello world i am computer",
        "HelloWorldIAmComputer",
        "helloWorldIAmComputer",
        "hello_world_i_am_computer",
        "HELLO_WORLD_I_AM_COMPUTER",
        "--------Hello world---i am computer____",
        "hello_World i Am-computer",
        "hello_World i Am-computer-------",
        "-_Hello___world-i--AM    computer",
    ];

    public static readonly upperSnakeCase: string[] = [
        "HELLO_WORLD",
        "HELLO_MY_NAME_IS_CHOSE",
    ];

    public static readonly lowerSnakeCase: string[] = [
        "hello_world",
        "hello_my_name_is_chose",
    ];

    public static readonly upperCamelCase: string[] = [
        "HelloWorld",
        "HelloMyNameIsChose",
    ];

    public static readonly lowerCamelCase: string[] = [
        "helloWorld",
        "helloMyNameIsChose",
    ];

    public static readonly randomStrings: string[] = [
        ...MockData.stringHelloWorldIAmComputer,
        ...MockData.upperSnakeCase,
        ...MockData.lowerSnakeCase,
        ...MockData.upperCamelCase,
        ...MockData.lowerCamelCase,
    ];

    public static readonly man = ["Muž", "muz", "MAN", "m", "boY", "chLaPec", "M", "male"];

    public static readonly woman = ["Žena", "zena", "WOMAN", "w", "z", "GiRl", "Dievča", "woman", "female", "f"];

    public static readonly nothing: string[] = [
        ...MockData.charactersEmpty,
        ...MockData.randomStrings,
        ...MockData.numbers,
        ...MockData.characters,
        ...MockData.charactersCaseAble,
        ...MockData.charactersNotEmpty,
    ];

    public static readonly phoneNumbers: string[] = [
        "+421905123456",
        "00421905123456",
        "0905123456",
        "+421 905 123 456",
        "00421905 123 456",
        "0905 123 456",
        "(123) 456-7890",
        "(123)456-7890",
        "(048)99-99-999",
        "123-456-7890",
        "123.456.7890",
        "1234567890",
        "+31636363634",
        "075-63546725",
    ];

    public static readonly emails: string[] = [
        "abc@def.com",
        "my@name.is.chorche.com",
        "foo.bar@machine.subdomain.example.museum",
        `Abc@example.com`,
        // `Abc@example.com.`,
        // `Abc@10.42.0.1`,
        // `user@localserver`,
        `Abc.123@example.com`,
        `user+mailbox/department=shipping@example.com`,
        `"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com`,
        "!#$%&\'*+-/=?^_`.{|}~@example.com",
        "\"()<>[]:,;@\\\"!#$%&\'-/=?^_`{}| ~.a\"@example.org",
        "\"Abc@def\"@example.com",
        "\"Fred Bloggs\"@example.com",
        "\"Joe.\\Blow\"@example.com",
        // "Loïc.Accentué@voilà.fr",
        // "\" \"@example.org\"",
        // "user@[IPv6:2001:DB8::1]",
    ];

    public static readonly notEmails: string[] = [
        "Abc.example.com",
        "A@b@c@example.com",
        "a\"b(c)d,e:f;g<h>i[j\k]l@example.com",
        "just\"not\"right@example.com",
        "this is\"not\allowed@example.com",
        "this\ still\"not\\allowed@example.com",
        "john..doe@example.com",
        "john.doe@example..com",
        ...MockData.randomStrings,
    ];

    public static functionSum(a: number, b: any): number {
        if (isNaN(a) || isNaN(b)) {
            throw new Error("Wrong params");
        }

        return a + b;
    }
}
