/** @typedef {typeof __propDef.props}  ComponentSelectorProps */
/** @typedef {typeof __propDef.events}  ComponentSelectorEvents */
/** @typedef {typeof __propDef.slots}  ComponentSelectorSlots */
export default class ComponentSelector extends SvelteComponentTyped<{
    handle_select: any;
    show_modified: any;
}, {
    remove: CustomEvent<any>;
    add: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ComponentSelectorProps = typeof __propDef.props;
export type ComponentSelectorEvents = typeof __propDef.events;
export type ComponentSelectorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        handle_select: any;
        show_modified: any;
    };
    events: {
        remove: CustomEvent<any>;
        add: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
