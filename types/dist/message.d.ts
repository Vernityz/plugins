import type { OpCode } from "./protocol";
import type { PlayerUpdate, TrackEndEvent, TrackExceptionEvent, TrackStartEvent, TrackStuckEvent, WebSocketClosedEvent } from "./player";
import type { DistortionFilter, EqualizerFilter, Filter, KaraokeFilter, RotationFilter, TimescaleFilter, TremoloFilter, VibratoFilter, VolumeFilter } from "./filters";
import type { CPUStats, FrameStats, MemoryStats } from "./stats";
/**
 *
 */
export declare type Message<O extends OpCode, D> = {
    op: O;
} & D;
/**
 *
 */
export declare type PlayerMessage<O extends OpCode, D = unknown> = Message<O, {
    guildId: string;
} & D>;
/**
 * All types of messages.
 */
export declare type LavalinkMessage = IncomingMessage | OutgoingMessage;
/**
 * Incoming messages.
 */
export declare type IncomingMessage = PlayerEvent | PlayerUpdate | Stats;
/**
 * Outgoing messages.
 */
export declare type OutgoingMessage = PlayerOutgoingMessage | ConfigureResuming;
/**
 * An outgoing player message.
 */
export declare type PlayerOutgoingMessage = Filters | Play | Stop  | Pause | Seek | Destroy | Volume | VoiceUpdate | Equalizer;
/**
 * Payload for configuring the filters of a player.
 */
export declare type Filters = PlayerMessage<"filters", Partial<FilterData>>;
export declare type FilterData = {
    [Filter.Volume]: VolumeFilter;
    [Filter.Equalizer]: EqualizerFilter;
    [Filter.Karaoke]: KaraokeFilter;
    [Filter.Timescale]: TimescaleFilter;
    [Filter.Tremolo]: TremoloFilter;
    [Filter.Vibrato]: VibratoFilter;
    [Filter.Rotation]: RotationFilter;
    [Filter.Distortion]: DistortionFilter;
};
/**
 * An event related to an audio player.
 */
export declare type PlayerEvent = TrackStartEvent | TrackEndEvent | TrackStuckEvent | TrackExceptionEvent | WebSocketClosedEvent;
/**
 * Payload for providing an intercepted voice server & state update
 */
export declare type VoiceUpdate = PlayerMessage<"voiceUpdate", VoiceUpdateData>;
export interface VoiceUpdateData {
    sessionId: string;
    event: VoiceServerEvent;
}
export interface VoiceServerEvent {
    token: string;
    endpoint: string;
}
/**
 * Starts playback of the supplied track.
 */
export declare type Play = PlayerMessage<"play", PlayData>;
export interface PlayData {
    track: string;
    startTime?: number;
    endTime?: number;
    volume?: number;
    noReplace?: boolean;
    pause?: boolean;
}
/**
 * Configures the equalizer.
 * @deprecated in v4, use the filters api.
 */
export declare type Equalizer = PlayerMessage<"equalizer", EqualizerData>;
export interface EqualizerData {
    bands: EqualizerFilter;
}
/**
 * Configures resuming for this session.
 */
export declare type ConfigureResuming = Message<"configureResuming", ConfigureResumingData>;
export interface ConfigureResumingData {
    key: string;
    timeout: number;
}
/**
 * Stops playback of the current track.
 */
export declare type Stop = PlayerMessage<"stop">;
/**
 * Pauses playback of the current track.
 */
export declare type Pause = PlayerMessage<"pause", PauseData>;
export interface PauseData {
    pause: boolean;
}
/**
 * Seeks to the supplied position.
 */
export declare type Seek = PlayerMessage<"seek", SeekData>;
export interface SeekData {
    position: number;
}
/**
 * Sets the volume of the player.
 *
 * @deprecated This operation will be removed in v4.
 */
export declare type Volume = PlayerMessage<"volume", VolumeData>;
export interface VolumeData {
    volume: number;
}
/**
 * Stats about the node.
 */
export declare type Stats = Message<"stats", StatsData>;
export interface StatsData {
    /**
     * The amount of players on the node.
     */
    players: number;
    /**
     * The amount of players playing on the node.
     */
    playingPlayers: number;
    /**
     * The duration the node has been up.
     */
    uptime: number;
    /**
     * The nodes memory stats.
     */
    memory: MemoryStats;
    /**
     * The nodes CPU stats.
     */
    cpu: CPUStats;
    /**
     * The nodes frame stats.
     */
    frameStats?: FrameStats;
}
/**
 * Destroys the player.
 */
export declare type Destroy = PlayerMessage<"destroy">;
