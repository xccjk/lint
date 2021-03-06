import path from 'path';
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint';
import queryString from 'query-string';
export const getElementCodeInfo = (element) => {
    if (!(element === null || element === void 0 ? void 0 : element.dataset))
        return undefined;
    const { dataset } = element;
    // data attributes auto create by loader in webpack plugin `inspector-loader`
    const lineNumber = dataset.inspectorLine;
    const columnNumber = dataset.inspectorColumn;
    const relativePath = dataset.inspectorRelativePath;
    if (lineNumber && columnNumber && relativePath) {
        return {
            lineNumber,
            columnNumber,
            relativePath,
        };
    }
    if (element.parentElement) {
        return getElementCodeInfo(element.parentElement);
    }
    return undefined;
};
export const gotoEditor = (source) => {
    // PWD auto defined in webpack plugin `config-inspector`
    const pwd = process.env.PWD;
    if (!source || !pwd)
        return;
    const { relativePath, lineNumber, columnNumber } = source;
    const fileName = path.join(pwd, relativePath);
    const launchParams = {
        fileName,
        lineNumber,
        colNumber: columnNumber,
    };
    /**
     * api createLaunchEditorMiddleware in 'react-dev-utils/errorOverlayMiddleware'
     * auto launch in umi plugin `react-inspector`
     */
    fetch(`${launchEditorEndpoint}?${queryString.stringify(launchParams)}`);
};
/**
 * https://stackoverflow.com/questions/29321742/react-getting-a-component-from-a-dom-element-for-debugging
 */
export const getElementFiber = (element) => {
    const fiberKey = Object.keys(element).find(key => key.startsWith('__reactInternalInstance$'));
    if (fiberKey) {
        return element[fiberKey];
    }
    return null;
};
export const debugToolNameRegex = /^(.*?\.Provider|.*?\.Consumer|Anonymous|Trigger|Tooltip|_.*|[a-z].*)$/;
export const getSuitableFiber = (baseFiber) => {
    var _a, _b, _c;
    let fiber = baseFiber;
    while (fiber) {
        const name = (_b = (_a = fiber.type) === null || _a === void 0 ? void 0 : _a.displayName) !== null && _b !== void 0 ? _b : (_c = fiber.type) === null || _c === void 0 ? void 0 : _c.name;
        if (name && !debugToolNameRegex.test(name)) {
            return fiber;
        }
        fiber = fiber.return;
    }
    return null;
};
export const getFiberName = (fiber) => {
    var _a;
    const fiberType = (_a = getSuitableFiber(fiber)) === null || _a === void 0 ? void 0 : _a.type;
    let displayName;
    // The displayName property is not guaranteed to be a string.
    // It's only safe to use for our purposes if it's a string.
    // github.com/facebook/react-devtools/issues/803
    //
    // https://github.com/facebook/react/blob/v17.0.0/packages/react-devtools-shared/src/utils.js#L90-L112
    if (typeof (fiberType === null || fiberType === void 0 ? void 0 : fiberType.displayName) === 'string') {
        displayName = fiberType.displayName;
    }
    else if (typeof (fiberType === null || fiberType === void 0 ? void 0 : fiberType.name) === 'string') {
        displayName = fiberType.name;
    }
    return displayName;
};
export const getElementInspect = (element, sourcePath) => {
    const fiber = getSuitableFiber(getElementFiber(element));
    const fiberName = getFiberName(fiber);
    const nodeName = element.nodeName.toLowerCase();
    const elementName = fiberName
        ? fiberName
        : nodeName;
    const title = sourcePath
        ? `<${elementName}>`
        : `${nodeName} in <${fiberName}>`;
    return {
        fiber,
        name: fiberName,
        title,
    };
};
