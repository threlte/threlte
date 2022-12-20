export default class ReplProxy {
    constructor(iframe: any, handlers: any);
    iframe: any;
    handlers: any;
    pending_cmds: Map<any, any>;
    handle_event: (e: any) => any;
    destroy(): void;
    iframe_command(action: any, args: any): Promise<any>;
    handle_command_message(cmd_data: any): void;
    handle_repl_message(event: any): any;
    eval(script: any): Promise<any>;
    handle_links(): Promise<any>;
}
