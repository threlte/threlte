/** @typedef {typeof __propDef.props}  AstViewProps */
/** @typedef {typeof __propDef.events}  AstViewEvents */
/** @typedef {typeof __propDef.slots}  AstViewSlots */
export default class AstView extends SvelteComponentTyped<{
    ast: any;
    autoscroll?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AstViewProps = typeof __propDef.props;
export type AstViewEvents = typeof __propDef.events;
export type AstViewSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        ast: any;
        autoscroll?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
