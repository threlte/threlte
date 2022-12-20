/** @typedef {typeof __propDef.props}  ViewerProps */
/** @typedef {typeof __propDef.events}  ViewerEvents */
/** @typedef {typeof __propDef.slots}  ViewerSlots */
export default class Viewer extends SvelteComponentTyped<{
    status: any;
    error: any;
    setProp?: (prop: any, value: any) => void;
    relaxed?: boolean;
    injectedJS?: string;
    injectedCSS?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get setProp(): (prop: any, value: any) => void;
}
export type ViewerProps = typeof __propDef.props;
export type ViewerEvents = typeof __propDef.events;
export type ViewerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        status: any;
        error: any;
        setProp?: (prop: any, value: any) => void;
        relaxed?: boolean;
        injectedJS?: string;
        injectedCSS?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
