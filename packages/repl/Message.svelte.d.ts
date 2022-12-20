/** @typedef {typeof __propDef.props}  MessageProps */
/** @typedef {typeof __propDef.events}  MessageEvents */
/** @typedef {typeof __propDef.slots}  MessageSlots */
export default class Message extends SvelteComponentTyped<{
    kind: any;
    details?: any;
    filename?: any;
    truncate?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type MessageProps = typeof __propDef.props;
export type MessageEvents = typeof __propDef.events;
export type MessageSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        kind: any;
        details?: any;
        filename?: any;
        truncate?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
