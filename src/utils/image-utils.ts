import { CreateElement, CreateImage } from "./html-utils";


export function serializeImage(image: HTMLImageElement): string {
    const canvas = CreateElement("canvas", {
        width : image.width,
        height: image.height,
    });
    (canvas.getContext("2d") as CanvasRenderingContext2D).drawImage(image, 0, 0);

    return canvas.toDataURL("image/png");
}

export function deserializeImage(image: string): HTMLImageElement {
    return CreateImage({
        src: image
    });
}

export function createImage(callback: (context: CanvasRenderingContext2D) => void, width: number, height = width): HTMLCanvasElement {
    const canvas = CreateElement("canvas", {width, height});
    callback(canvas.getContext("2d") as CanvasRenderingContext2D);

    return canvas;

}
