"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const encoding_1 = require("@lavalink/encoding");
class Song {
    constructor(track, requester) {
        this.track = typeof track === "string" ? track : track.track;
        this.requester = requester;
        if (typeof track !== "string") {
            this.length = track.info.length;
            this.identifier = track.info.identifier;
            this.author = track.info.author;
            this.isStream = track.info.isStream;
            this.position = track.info.position;
            this.title = track.info.title;
            this.uri = track.info.uri;
            this.isSeekable = track.info.isSeekable;
            this.sourceName = track.info.sourceName;
        }
        else {
            const decoded = (0, encoding_1.decode)(this.track);
            this.length = Number(decoded.length);
            this.identifier = decoded.identifier;
            this.author = decoded.author;
            this.isStream = decoded.isStream;
            this.position = Number(decoded.position);
            this.title = decoded.title;
            this.uri = decoded.uri;
            this.isSeekable = !decoded.isStream;
            this.sourceName = decoded.source;
        }
    }
}
exports.Song = Song;
