/** @typedef {typeof __propDef.props}  ConsoleTableProps */
/** @typedef {typeof __propDef.events}  ConsoleTableEvents */
/** @typedef {typeof __propDef.slots}  ConsoleTableSlots */
export default class ConsoleTable extends SvelteComponentTyped<{
    data: any;
    columns: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ConsoleTableProps = typeof __propDef.props;
export type ConsoleTableEvents = typeof __propDef.events;
export type ConsoleTableSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        data: any;
        columns: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
