/** @typedef {typeof __propDef.props}  ModuleEditorProps */
/** @typedef {typeof __propDef.events}  ModuleEditorEvents */
/** @typedef {typeof __propDef.slots}  ModuleEditorSlots */
export default class ModuleEditor extends SvelteComponentTyped<{
    theme: any;
    errorLoc: any;
    focus?: () => void;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get focus(): () => void;
}
export type ModuleEditorProps = typeof __propDef.props;
export type ModuleEditorEvents = typeof __propDef.events;
export type ModuleEditorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        theme: any;
        errorLoc: any;
        focus?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
