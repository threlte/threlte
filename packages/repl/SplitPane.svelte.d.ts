/** @typedef {typeof __propDef.props}  SplitPaneProps */
/** @typedef {typeof __propDef.events}  SplitPaneEvents */
/** @typedef {typeof __propDef.slots}  SplitPaneSlots */
export default class SplitPane extends SvelteComponentTyped<{
    type: any;
    min: number;
    max: number;
    fixed?: boolean;
    pos?: number;
    buffer?: number;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    a: {};
    b: {};
}> {
}
export type SplitPaneProps = typeof __propDef.props;
export type SplitPaneEvents = typeof __propDef.events;
export type SplitPaneSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        type: any;
        min: number;
        max: number;
        fixed?: boolean;
        pos?: number;
        buffer?: number;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        a: {};
        b: {};
    };
};
export {};
