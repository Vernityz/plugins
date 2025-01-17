"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.LoopType = void 0;
const Song_1 = require("./Song");
const lavaclient_1 = require("lavaclient");
const types_1 = require("@lavaclient/types");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
var LoopType;
(function (LoopType) {
    LoopType[LoopType["None"] = 0] = "None";
    LoopType[LoopType["Queue"] = 1] = "Queue";
    LoopType[LoopType["Song"] = 2] = "Song";
})(LoopType = exports.LoopType || (exports.LoopType = {}));
class Queue extends tiny_typed_emitter_1.TypedEmitter {
    constructor(player) {
        super();
        this.player = player;
        this.tracks = [];
        this.previous = [];
        this.loop = { type: LoopType.None, current: 0, max: -1 };
        this.last = null;
        this.current = null;
        this.data = {};
        player.on("trackStart", () => {
            if (!this.current) {
                return;
            }
            if (this.loop.type === LoopType.Song &&
                this.current === this.last) {
                this.loop.current++;
            }
            this.emit("trackStart", this.current);
        });
        player.on("trackEnd", (_, reason) => {
            if (!types_1.mayStartNext[reason]) {
                return;
            }
            this.last = this.current;
            if (this.current) {
                switch (this.loop.type) {
                    case LoopType.Song:
                        return this.player.play(this.current, {});
                    case LoopType.Queue:
                        this.previous.push(this.current);
                        break;
                }
                this.emit("trackEnd", this.current);
            }
            if (!this.tracks.length) {
                this.tracks = this.previous;
                this.previous = [];
            }
            return this.next();
        });
    }
    async skip() {
        await this.player.stop();
        return this.current;
    }
    async start() {
        return this.next();
    }
    async next() {
        const next = this.tracks.shift();
        if (!next) {
            this.emit("finish");
            return false;
        }
        this.current = next;
        await this.player.play(next, {});
        return true;
    }
    clear() {
        this.tracks = [];
    }
    remove(song) {
        if (typeof song === "number") {
            if (song < 0 || song >= this.tracks.length) {
                return null;
            }
            return this.tracks.splice(song, 1)[0] ?? null;
        }
        const index = this.tracks.indexOf(song);
        if (index !== -1) {
            return null;
        }
        return this.tracks.splice(index, 1)[0] ?? null;
    }
    emit(event, ...args) {
        const _event = event === "finish" ? "queueFinish" : event;
        this.player.node.emit(_event, this, ...args);
        return super.emit(event, ...args);
    }
    add(songs, options = {}) {
        songs = Array.isArray(songs) ? songs : [songs];
        const requesterId = options.requester && (0, lavaclient_1.getId)(options.requester), toAdd = songs.map(song => song instanceof Song_1.Song ? song : new Song_1.Song(song, requesterId));
        this.tracks[options.next ? "unshift" : "push"](...toAdd);
        return this.tracks.length;
    }
    setLoop(type, max = this.loop.max) {
        this.loop.type = type;
        this.loop.max = max;
        return this;
    }
    sort(predicate) {
        return this.tracks.sort(predicate);
    }
    shuffle() {
        for (let i = this.tracks.length; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tracks[i], this.tracks[j]] = [this.tracks[j], this.tracks[i]];
        }
    }
    set(p1, p2) {
        if (typeof p1 !== "string") {
            this.data = p1;
            return;
        }
        if (p2 != null) {
            this.data[p1] = p2;
            return;
        }
    }
    get(key) {
        return key ? this.data[key] : this.data;
    }
}
exports.Queue = Queue;
