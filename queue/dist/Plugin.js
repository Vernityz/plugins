"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = exports._queue = void 0;
const Queue_1 = require("./Queue");
const lavaclient_1 = require("lavaclient");
exports._queue = Symbol.for("Player#queue");
function load(queueClass = Queue_1.Queue) {
    Reflect.defineProperty(lavaclient_1.Player.prototype, "queue", {
        get() {
            return (this[exports._queue] ??= new queueClass(this));
        },
    });
}
exports.load = load;
