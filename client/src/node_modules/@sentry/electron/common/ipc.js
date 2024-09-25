Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCChannel = exports.PROTOCOL_SCHEME = void 0;
exports.PROTOCOL_SCHEME = 'sentry-ipc';
var IPCChannel;
(function (IPCChannel) {
    /** IPC to check main process is listening */
    IPCChannel["PING"] = "sentry-electron.ping";
    /** IPC to send a captured event to Sentry. */
    IPCChannel["EVENT"] = "sentry-electron.event";
    /** IPC to capture scope globally. */
    IPCChannel["SCOPE"] = "sentry-electron.scope";
})(IPCChannel = exports.IPCChannel || (exports.IPCChannel = {}));
//# sourceMappingURL=ipc.js.map