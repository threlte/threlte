/** @typedef {typeof __propDef.props}  IndexProps */
/** @typedef {typeof __propDef.events}  IndexEvents */
/** @typedef {typeof __propDef.slots}  IndexSlots */
export default class Index extends SvelteComponentTyped<{
    packagesUrl?: string;
    svelteUrl?: string;
    update?: (data: any) => void;
    theme?: string;
    set?: (data: any) => Promise<void>;
    orientation?: string;
    fixed?: boolean;
    relaxed?: boolean;
    injectedJS?: string;
    injectedCSS?: string;
    embedded?: boolean;
    showAst?: boolean;
    fixedPos?: number;
    showModified?: boolean;
    toJSON?: () => {
        imports: any;
        components: any[];
    };
    markSaved?: () => void;
}, {
    add: CustomEvent<any>;
    remove: CustomEvent<any>;
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get toJSON(): () => {
        imports: any;
        components: any[];
    };
    get set(): (data: any) => Promise<void>;
    get markSaved(): () => void;
    get update(): (data: any) => void;
}
export type IndexProps = typeof __propDef.props;
export type IndexEvents = typeof __propDef.events;
export type IndexSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        packagesUrl?: string;
        svelteUrl?: string;
        update?: (data: any) => void;
        theme?: string;
        set?: (data: any) => Promise<void>;
        orientation?: string;
        fixed?: boolean;
        relaxed?: boolean;
        injectedJS?: string;
        injectedCSS?: string;
        embedded?: boolean;
        showAst?: boolean;
        fixedPos?: number;
        showModified?: boolean;
        toJSON?: () => {
            imports: any;
            components: any[];
        };
        markSaved?: () => void;
    };
    events: {
        add: CustomEvent<any>;
        remove: CustomEvent<any>;
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
