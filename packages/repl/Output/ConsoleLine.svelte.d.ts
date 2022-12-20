/** @typedef {typeof __propDef.props}  ConsoleLineProps */
/** @typedef {typeof __propDef.events}  ConsoleLineEvents */
/** @typedef {typeof __propDef.slots}  ConsoleLineSlots */
export default class ConsoleLine extends SvelteComponentTyped<{
    log: any;
    level?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ConsoleLineProps = typeof __propDef.props;
export type ConsoleLineEvents = typeof __propDef.events;
export type ConsoleLineSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        log: any;
        level?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
