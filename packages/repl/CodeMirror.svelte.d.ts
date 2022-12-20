/** @typedef {typeof __propDef.props}  CodeMirrorProps */
/** @typedef {typeof __propDef.events}  CodeMirrorEvents */
/** @typedef {typeof __propDef.slots}  CodeMirrorSlots */
export default class CodeMirror extends SvelteComponentTyped<{
    theme: any;
    focus?: () => void;
    update?: (new_code: any) => void;
    markText?: ({ from, to }: {
        from: any;
        to: any;
    }) => void;
    resize?: () => void;
    lineNumbers?: boolean;
    setHistory?: (history: any) => void;
    readonly?: boolean;
    set?: (new_code: any, new_mode: any) => Promise<void>;
    errorLoc?: any;
    tab?: boolean;
    getHistory?: () => any;
    clearHistory?: () => void;
    setCursor?: (pos: any) => void;
    cursorIndex?: import("svelte/store").Writable<number>;
    unmarkText?: () => void;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
    get set(): (new_code: any, new_mode: any) => Promise<void>;
    get update(): (new_code: any) => void;
    get resize(): () => void;
    get focus(): () => void;
    get getHistory(): () => any;
    get setHistory(): (history: any) => void;
    get clearHistory(): () => void;
    get setCursor(): (pos: any) => void;
    get cursorIndex(): import("svelte/store").Writable<number>;
    get markText(): ({ from, to }: {
        from: any;
        to: any;
    }) => void;
    get unmarkText(): () => void;
}
export type CodeMirrorProps = typeof __propDef.props;
export type CodeMirrorEvents = typeof __propDef.events;
export type CodeMirrorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        theme: any;
        focus?: () => void;
        update?: (new_code: any) => void;
        markText?: ({ from, to }: {
            from: any;
            to: any;
        }) => void;
        resize?: () => void;
        lineNumbers?: boolean;
        setHistory?: (history: any) => void;
        readonly?: boolean;
        set?: (new_code: any, new_mode: any) => Promise<void>;
        errorLoc?: any;
        tab?: boolean;
        getHistory?: () => any;
        clearHistory?: () => void;
        setCursor?: (pos: any) => void;
        cursorIndex?: import("svelte/store").Writable<number>;
        unmarkText?: () => void;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
