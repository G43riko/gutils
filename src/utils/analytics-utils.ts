/**
 * Method check if app is running inside Internet explorer
 */
export function isIE(): boolean {
    return navigator.userAgent.indexOf("MSIE") >= 0;
}

/**
 * Method check if app is running inside Internet explorer 6
 */
export function isIE6(): boolean {
    return navigator.userAgent.indexOf("MSIE 6") >= 0;
}

/**
 * Method check if app is running inside Internet explorer 11
 */
export function isIE11(): boolean {
    return !!navigator.userAgent.match(/Trident\/7\./);
}

/**
 * Method check if app is running inside Edge
 */
export function isEdge(): boolean {
    return !!navigator.userAgent.match(/Edge\//);
}

/**
 * Method check if app is running inside Safary
 */
export function isSafari(): boolean {
    return navigator.userAgent.indexOf("AppleWebKit/") >= 0 &&
        navigator.userAgent.indexOf("Chrome/") < 0 &&
        navigator.userAgent.indexOf("Edge/") < 0;
}

/**
 * Method check if app is running inside IOS
 */
export function isIOS(): boolean {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
}

/**
 * Method check if app is running inside Chrome
 */
export function isChromeApp(): boolean {
    return (window as any).chrome && (window as any).chrome.app && (window as any).chrome.app.runtime;
}

/**
 * Method check if app is running onMessage Windows
 */
export function isWin(): boolean {
    return navigator.appVersion.indexOf("Win") > 0;
}

/**
 * Method check if app is running onMessage Mac OS
 */
export function isMac(): boolean {
    return navigator.appVersion.indexOf("Mac") > 0;
}

/**
 * Method check if app is running Chrome OS
 */
export function isChromeOs(): boolean {
    return /\bCrOS\b/.test(navigator.userAgent);
}

/**
 * Method check if device support touch events
 */
export function isTouch(): boolean {
    return "ontouchstart" in document.documentElement;
}

/**
 * Method check if device support mouse events
 */
export function hasMouse(): boolean {
    return "onmousemove" in document.documentElement;
}
