import * as fs from "fs";
import * as http from "http";
import * as https from "https";

export class NetServerUtils {
    public static downloadFile(url: string, fileName: string): void {
        const file = fs.createWriteStream(fileName);
        http.get(url, (response) => response.pipe(file));
    }

    public static getPublicIp(): Promise<string> {
        const options = {
            host: "ipv4bot.whatismyipaddress.com",
            port: 80,
            path: "/"
        };

        return new Promise((success, reject) => {
            http.get(options, (res) => {
                res.on("data", (chunk) => {
                    success(String(chunk));
                });
            }).on("error", reject);
        });
    }

    public static getContentFrom(url: string): Promise<string> {
        const callback = (res: http.IncomingMessage, success: any) => {
            let data = "";
            res.on("data", (chunk) => data += chunk);
            res.on("end", () => success(data));
        };

        return new Promise((success, reject) => {
            if (url.startsWith("https")) {
                const request = https.get(url, {}, (res: http.IncomingMessage) => callback(res, success));
                request.on("error", reject);
                request.end();
            } else {
                const request = http.request(url, {}, (res: http.IncomingMessage) => callback(res, success));
                request.on("error", reject);
                request.end();
            }
        });
    }
}
