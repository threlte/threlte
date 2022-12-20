/** @typedef {typeof __propDef.props}  PaneWithPanelProps */
/** @typedef {typeof __propDef.events}  PaneWithPanelEvents */
/** @typedef {typeof __propDef.slots}  PaneWithPanelSlots */
export default class PaneWithPanel extends SvelteComponentTyped<{
    panel: any;
    pos?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    main: {};
    'panel-header': {};
    'panel-body': {};
}> {
}
export type PaneWithPanelProps = typeof __propDef.props;
export type PaneWithPanelEvents = typeof __propDef.events;
export type PaneWithPanelSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        panel: any;
        pos?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        main: {};
        'panel-header': {};
        'panel-body': {};
    };
};
export {};
