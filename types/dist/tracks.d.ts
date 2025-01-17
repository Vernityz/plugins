import type { FriendlyException } from "./common";
export declare enum LoadType {
    /**
     * A single track was loaded.
     */
    TrackLoaded = "TRACK_LOADED",
    /**
     * A playlist was loaded.
     */
    PlaylistLoaded = "PLAYLIST_LOADED",
    /**
     * A search result was made, either with `ytsearch:` or `scsearch:`.
     */
    SearchResult = "SEARCH_RESULT",
    /**
     * Nothing was founded for the supplied identifier.
     */
    NoMatches = "NO_MATCHES",
    /**
     * Lavaplayer failed to load something.
     */
    LoadFailed = "LOAD_FAILED"
}
/**
 * A base64 encoded track, due to lavalink being developed in java it cannot be decoded "normally".
 *
 * @see https://www.npmjs.com/package/@lavalink/encoding
 */
export declare type EncodedTrack = string;
/**
 *
 */
declare type Response<T extends LoadType, D = {}> = {
    loadType: T;
    playlistInfo: PlaylistInfo;
    tracks: Track[];
} & D;
/**
 * Parameters required by `GET /loadtracks`
 */
export interface LoadTracksParameters {
    identifier: string;
}
/**
 * Possible responses of `GET /loadtracks`.
 */
export declare type LoadTracksResponse = TrackLoaded | PlaylistLoaded | SearchResult | NoMatches | LoadFailed;
/**
 * Parameters required by `GET /decodetrack`.
 */
export interface DecodeTrackParameters {
    /**
     * Encoded track to decode.
     */
    track: EncodedTrack;
}
/**
 * Response of `GET /decodetrack`.
 */
export declare type DecodeTrackResponse = TrackInfo;
/**
 * Request body of `POST /decodetracks`.
 */
export declare type DecodeTracksRequest = EncodedTrack[];
/**
 * Response of `POST /decodetracks`.
 */
export declare type DecodeTracksResponse = TrackInfo[];
export interface PlaylistInfo {
    /**
     * The name of the track.
     */
    name: string;
    /**
     *
     */
    selectedTrack: number;
}
/**
 * Returned when a single track was loaded
 */
export declare type TrackLoaded = Response<LoadType.TrackLoaded>;
/**
 * Returned when a playlist is loaded.
 */
export declare type PlaylistLoaded = Response<LoadType.PlaylistLoaded>;
/**
 * Returned when a search result is made (i.e. `ytsearch: some song`)
 */
export declare type SearchResult = Response<LoadType.SearchResult>;
/**
 * Returned if no matches/sources could be found for a given identifier.
 */
export declare type NoMatches = Response<LoadType.NoMatches>;
/**
 * Returned if lavaplayer failed to load something.
 */
export declare type LoadFailed = Response<LoadType.LoadFailed, {
    /**
     * The exception that was thrown
     */
    exception: FriendlyException;
}>;
export interface Track {
    track: EncodedTrack;
    info: TrackInfo;
}
export interface TrackInfo {
    identifier: string;
    isStream: boolean;
    isSeekable: boolean;
    author: string;
    length: number;
    position: number;
    title: string;
    uri: string;
    sourceName: string;
}
export {};
