import { CreateElement, CreateImage } from "./html-utils";
import { NotBrowserException } from "../errors/NotBrowserException";

export async function uploadImage(): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((success, reject) => {
        const element = CreateElement("input", {
            type    : "file",
            onChange: (event: Event) => {
                const reader = new FileReader();
                reader.onload = () => {
                    success(CreateImage({
                        src: reader.result as string
                    }));
                };
                reader.onerror = reject;
                reader.readAsDataURL((event.target as any).files[0]);
            }
        });
        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });

}

export async function uploadFile(): Promise<string> {
    return new Promise<string>((success) => {
        const element = CreateElement("input", {
            type    : "file",
            onChange: (event: Event) => {
                const reader = new FileReader();
                reader.onload = () => {
                    success(reader.result as string);
                };
                reader.readAsText((event.target as any).files[0]);
            }
        });
        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });

}

export function downloadFile(text: string, name: string): void {
    const element = CreateElement("a", {
        href    : "data:text/plain;charset=utf-8," + encodeURIComponent(text),
        download: name,
    });

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function includeFile(file: string): void {
    if (typeof document === "undefined") {
        throw new NotBrowserException();
    }
    const script = document.createElement("script");
    if (!script) {
        return;
    }
    script.src   = file;
    script.type  = "text/javascript";
    script.defer = true;
    document.head.appendChild(script);
}
