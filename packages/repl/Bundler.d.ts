export default class Bundler {
    constructor({ packagesUrl, svelteUrl, onstatus }: {
        packagesUrl: any;
        svelteUrl: any;
        onstatus: any;
    });
    worker: any;
    handlers: Map<any, any>;
    bundle(components: any): Promise<any>;
    destroy(): void;
}
