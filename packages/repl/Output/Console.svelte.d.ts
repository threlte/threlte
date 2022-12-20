/** @typedef {typeof __propDef.props}  ConsoleProps */
/** @typedef {typeof __propDef.events}  ConsoleEvents */
/** @typedef {typeof __propDef.slots}  ConsoleSlots */
export default class Console extends SvelteComponentTyped<{
    logs: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ConsoleProps = typeof __propDef.props;
export type ConsoleEvents = typeof __propDef.events;
export type ConsoleSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        logs: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
