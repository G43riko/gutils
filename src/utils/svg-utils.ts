const svgns = "http://www.w3.org/2000/svg";

export function createSvg<T extends keyof SVGElementTagNameMap>(type: T): SVGElementTagNameMap[T] {
    return document.createElementNS(svgns, type);
}

export function getTransform(selectedElement: SVGGraphicsElement): SVGTransform {
    const transforms = selectedElement.transform.baseVal;
    if (transforms.numberOfItems === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        const translate = (selectedElement.ownerSVGElement as SVGSVGElement).createSVGTransform();
        translate.setTranslate(0, 0);
        selectedElement.transform.baseVal.insertItemBefore(translate, 0);
    }

    return transforms.getItem(0);
}
