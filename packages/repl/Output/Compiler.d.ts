export default class Compiler {
    constructor(svelteUrl: any);
    worker: any;
    handlers: Map<any, any>;
    compile(component: any, options: any, return_ast: any): Promise<any>;
    destroy(): void;
}
