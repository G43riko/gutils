import { ALLOW_IMAGES_ONLY_WITH_ALLOWED_CORS } from "../constants";
import { NotBrowserException } from "../errors/NotBrowserException";

export interface ElementAttributes {
    className?: string;
    children?: (Node | string)[] | Node | string;
    type?: string;
    onChange?: (value: any) => void;
    onClick?: (value: any) => void;
    styles?: { [style in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[style] };
    content?: string;
    src?: string;
    for?: string;
    id?: string;
    autoplay?: boolean;
    href?: string;
    download?: string;
    checked?: boolean;
    width?: number;
    height?: number;
}

export function elementToString(element: HTMLElement, showParent = true): string {
    const classes = Array.from(element.classList).join(".");
    const id      = element.id ? "#" + element.id : "";
    const parent  = element.parentElement ? elementToString(element.parentElement, false) + " > " : "";

    return parent + element.localName + id + (classes ? "." + classes : "");
}

export function dragElement(element: HTMLElement, headerSelector = ".header"): { clear: () => void } {
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    const dragMouseDown = (e: PointerEvent) => {
        e = e || window.event;
        e.preventDefault();
        pos3                   = e.clientX;
        pos4                   = e.clientY;
        document.onpointerup   = closeDragElement;
        document.onpointermove = elementDrag;
    };

    const elementDrag = (e: PointerEvent): void => {
        e = e || window.event;
        e.preventDefault();
        pos1               = pos3 - e.clientX;
        pos2               = pos4 - e.clientY;
        pos3               = e.clientX;
        pos4               = e.clientY;
        element.style.top  = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    };

    const header = element.querySelector(headerSelector) as HTMLElement;
    if (header) {
        header.addEventListener("pointerdown", dragMouseDown);
    } else {
        element.addEventListener("pointerdown", dragMouseDown);
    }

    function closeDragElement(): void {
        document.onpointerup   = null;
        document.onpointermove = null;
    }

    return {
        clear: () => {
            if (header) {
                header.removeEventListener("pointerdown", dragMouseDown);
            } else {
                element.removeEventListener("pointerdown", dragMouseDown);
            }
        }
    };
}

export function CreateImage(options?: ElementAttributes): HTMLElementTagNameMap["img"] {
    const result = CreateElement("img", options);

    if (ALLOW_IMAGES_ONLY_WITH_ALLOWED_CORS) {
        result.crossOrigin = "Anonymous";
    }

    return result;
}

export function createCheckbox(label: string, onChange: (checked: boolean) => void, checked = false): HTMLLabelElement {
    const inputElement: HTMLInputElement = CreateElement("input", {
        checked,
        type    : "checkbox",
        onChange: () => onChange(inputElement.checked),
    });

    return CreateElement("label", {
        className: "checkbox-container",
        children : [label, inputElement, CreateElement("span", {className: "checkmark"})],
    });
}

export function CreateElement<K extends keyof HTMLElementTagNameMap>(type: K, options?: ElementAttributes): HTMLElementTagNameMap[K] {
    const result = document.createElement<K>(type);
    if (!options) {
        return result;
    }

    Object.entries(options).forEach((entry) => {
        switch (entry[0]) {
            case "className":
                result.className = entry[1];
                break;
            case "onChange":
                result.addEventListener("change", entry[1]);
                break;
            case "onClick":
                result.addEventListener("click", entry[1]);
                break;
            case "checked":
                (result as HTMLInputElement).checked = entry[1];
                break;
            case "styles":
                Object.entries(entry[1]).forEach((styleEntry) => {
                    result.style[styleEntry[0] as any] = styleEntry[1] as any;
                });
                break;
            case "children":
                if (Array.isArray(entry[1])) {
                    result.append(...entry[1]);
                } else {
                    result.append(entry[1]);
                }
                break;
            case "content":
                if (entry[1]) {
                    result.innerHTML = entry[1];
                }
                break;
            default:
                result.setAttribute(entry[0], entry[1]);
        }
    });

    return result;
}

/**
 * TODO: element remains after deletion onMessage screen
 */
export function chooseColorUsingDefaultInput(): Promise<string> {
    return new Promise((success) => {
        const input = CreateElement("input", {
            type     : "color",
            className: "hidden",
            onChange : () => {
                success(input.value);
                document.body.removeChild(input);
            }
        });
        document.body.appendChild(input);
        input.click();
    });
}

export function getOrCreate<K extends keyof HTMLElementTagNameMap>(parent: HTMLElement, type: K, ...classes: string[]): HTMLElementTagNameMap[K] {
    const result = parent.querySelector<HTMLElementTagNameMap[K]>(`${type}.${classes.join(".")}`);
    if (result) {
        return result;
    }

    return CreateElement(type, {className: classes.join(" ")});
}

export function getOrCreateAndAppend<K extends keyof HTMLElementTagNameMap>(parent: HTMLElement, type: K, ...classes: string[]): HTMLElementTagNameMap[K] {
    const result = getOrCreate<K>(parent, type, ...classes);
    parent.appendChild(result);

    return result;
}
