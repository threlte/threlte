/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    svelteUrl: any;
    status: any;
    theme: any;
    injectedJS: any;
    injectedCSS: any;
    showAst: any;
    relaxed?: boolean;
    sourceErrorLoc?: any;
    runtimeError?: any;
    embedded?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        svelteUrl: any;
        status: any;
        theme: any;
        injectedJS: any;
        injectedCSS: any;
        showAst: any;
        relaxed?: boolean;
        sourceErrorLoc?: any;
        runtimeError?: any;
        embedded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
