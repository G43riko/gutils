export interface AjaxParams {
    method: "GET" | "POST";
    url: string;
    onResponse: (data: any) => void;
    content: string;
    headers: { [key: string]: string };
}

class AjaxWrapper {
    public constructor(private readonly ajaxHandler: XMLHttpRequest) {
    }
}

export function ajax({
                         method = "GET",
                         url,
                         onResponse,
                         content,
                         headers = {},
                     }: AjaxParams): AjaxWrapper {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (!(request.readyState === 4 && (request.status === 200 || request.status === 201))) {
            return;
        }
        if (typeof onResponse === "function") {
            onResponse(request.responseText);
        }
    };
    request.open(method, url, true);
    Object.entries(headers).forEach((entry) => request.setRequestHeader(entry[0], entry[1]));
    request.send(content);

    return new AjaxWrapper(request);
}
