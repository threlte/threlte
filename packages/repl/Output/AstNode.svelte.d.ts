/** @typedef {typeof __propDef.props}  AstNodeProps */
/** @typedef {typeof __propDef.events}  AstNodeEvents */
/** @typedef {typeof __propDef.slots}  AstNodeSlots */
export default class AstNode extends SvelteComponentTyped<{
    collapsed?: boolean;
    value?: any;
    key?: string;
    path_nodes?: any[];
    autoscroll?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AstNodeProps = typeof __propDef.props;
export type AstNodeEvents = typeof __propDef.events;
export type AstNodeSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        collapsed?: boolean;
        value?: any;
        key?: string;
        path_nodes?: any[];
        autoscroll?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
