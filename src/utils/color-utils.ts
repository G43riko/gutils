import {clamp} from "./math-utils";

const colors: { [color: string]: [number, number, number] } = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0, 255, 0],
    blue: [0, 0, 255],
};

export function lerpColor(
    fromColor: [number, number, number, number],
    toColor: [number, number, number, number],
    progress: number,
): [number, number, number, number] {
    const red = progress * fromColor[0] + (1 - progress) * toColor[0];
    const green = progress * fromColor[1] + (1 - progress) * toColor[1];
    const blue = progress * fromColor[2] + (1 - progress) * toColor[2];
    const alpha = progress * fromColor[3] + (1 - progress) * toColor[3];
    return [
        clamp(red, 0, 255),
        clamp(green, 0, 255),
        clamp(blue, 0, 255),
        clamp(alpha, 0, 255),
    ];
}

export function hex2rgb(color: string): [number, number, number] {
    const num = parseInt(color.slice(1), 16);

    return [num >> 16, num >> 8 & 0x00FF, num & 0x0000FF];
}

export function shadeColor(color: string, percent: number): string {
    const num = hex2rgb(color);
    const amt = Math.round(2.55 * percent);
    const R   = num[0] + amt;
    const G   = num[1] + amt;
    const B   = num[2] + amt;

    return rgb2hex(R, G, B);
}

export function rgb2hex(R: number, G: number, B: number): string {
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

export function int2hex(val: number): string {
    const value  = val.toString(16);
    const result = "000000".substr(0, 6 - value.length) + value;

    return "#" + result.toUpperCase();
}

export function int2rgb(val: number): [number, number, number] {
    return [
        val >> 16,
        (val >> 8) & 0xFF,
        val & 0xFF
    ];
}

export function hex2int(val: string): number {
    return parseInt(val, 16);
}

export function rgb2int(R: number, G: number, B: number): number {
    return R << 16 | (G << 8) & 0xFFFF | B;
}


export function parseColor(color: string): [number, number, number] {
    if (colors[color]) {
        return colors[color];
    }

    const hexaMatch = color.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/);
    if (hexaMatch) {
        return [
            parseInt(hexaMatch[1], 16),
            parseInt(hexaMatch[2], 16),
            parseInt(hexaMatch[3], 16),
        ];
    }

    const rgbaMath = color.match(/rgba?\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})( *, *\d*.?\d*)\)/);
    if (rgbaMath) {
        return [
            parseInt(rgbaMath[1], 10),
            parseInt(rgbaMath[2], 10),
            parseInt(rgbaMath[3], 10),
        ];
    }

    throw new Error("Cannot parse color: " + color);
}
