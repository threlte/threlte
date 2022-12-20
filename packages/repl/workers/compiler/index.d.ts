declare function compile({ id, source, options, return_ast }: {
    id: any;
    source: any;
    options: any;
    return_ast: any;
}): {
    id: any;
    result: {
        js: any;
        css: any;
        ast: any;
    };
} | {
    id: any;
    result: {
        js: string;
        css: string;
        ast?: undefined;
    };
};
declare let fulfil_ready: any;
declare const ready: Promise<any>;
declare namespace common_options {
    const dev: boolean;
    const css: boolean;
}
