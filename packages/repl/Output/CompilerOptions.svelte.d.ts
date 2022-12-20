/** @typedef {typeof __propDef.props}  CompilerOptionsProps */
/** @typedef {typeof __propDef.events}  CompilerOptionsEvents */
/** @typedef {typeof __propDef.slots}  CompilerOptionsSlots */
export default class CompilerOptions extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CompilerOptionsProps = typeof __propDef.props;
export type CompilerOptionsEvents = typeof __propDef.events;
export type CompilerOptionsSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
