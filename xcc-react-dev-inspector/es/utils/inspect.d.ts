import { Fiber } from 'react-reconciler';
export interface CodeInfo {
    lineNumber: string;
    columnNumber: string;
    relativePath: string;
}
export declare const getElementCodeInfo: (element: HTMLElement) => CodeInfo | undefined;
export declare const gotoEditor: (source?: CodeInfo | undefined) => void;
/**
 * https://stackoverflow.com/questions/29321742/react-getting-a-component-from-a-dom-element-for-debugging
 */
export declare const getElementFiber: (element: HTMLElement) => Fiber | null;
export declare const debugToolNameRegex: RegExp;
export declare const getSuitableFiber: (baseFiber?: any) => Fiber | null;
export declare const getFiberName: (fiber?: any) => string | undefined;
export declare const getElementInspect: (element: HTMLElement, sourcePath?: string | undefined) => {
    fiber?: any;
    name?: string | undefined;
    title: string;
};
