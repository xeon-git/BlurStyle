export const PROTOCOL_SCHEME = 'sentry-ipc';
export var IPCChannel;
(function (IPCChannel) {
    /** IPC to check main process is listening */
    IPCChannel["PING"] = "sentry-electron.ping";
    /** IPC to send a captured event to Sentry. */
    IPCChannel["EVENT"] = "sentry-electron.event";
    /** IPC to capture scope globally. */
    IPCChannel["SCOPE"] = "sentry-electron.scope";
})(IPCChannel || (IPCChannel = {}));
//# sourceMappingURL=ipc.js.map