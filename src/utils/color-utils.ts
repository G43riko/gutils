const colors: { [color: string]: [number, number, number] } = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0, 255, 0],
    blue: [0, 0, 255],
};

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
