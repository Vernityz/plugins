import { DiscordResource, Player, Snowflake } from "lavaclient";
import { Track } from "@lavaclient/types";
import { TypedEmitter } from "tiny-typed-emitter";
import type { TrackInfo } from "@lavaclient/types";

declare module "lavaclient" {
    interface Player {
        readonly queue: Queue;
    }
    interface ClusterEvents {
        nodeQueueCreate: (node: ClusterNode, queue: Queue) => void;
        nodeQueueFinish: (node: ClusterNode, queue: Queue) => void;
        nodeTrackStart: (node: ClusterNode, queue: Queue, song: Song) => void;
        nodeTrackEnd: (node: ClusterNode, queue: Queue, song: Song) => void;
    }
    interface NodeEvents {
        queueCreate: (queue: Queue) => void;
        queueFinish: (queue: Queue) => void;
        trackStart: (queue: Queue, song: Song) => void;
        trackEnd: (queue: Queue, song: Song) => void;
    }
}

export enum LoopType {
    None = 0,
    Queue = 1,
    Song = 2
}
export class Queue extends TypedEmitter<QueueEvents> {
    readonly player: Player;
    tracks: Song[];
    previous: Song[];
    loop: Loop;
    last: Song | null;
    current: Song | null;
    data: Record<string, any>;
    constructor(player: Player);
    skip(): Promise<Song | null>;
    start(): Promise<boolean>;
    next(): Promise<boolean>;
    clear(): void;
    remove(song: Song): Song | null;
    remove(index: number): Song | null;
    emit<U extends keyof QueueEvents>(event: U, ...args: Parameters<QueueEvents[U]>): boolean;
    add(songs: Addable | Array<Addable>, options?: AddOptions): number;
    setLoop(type: LoopType, max?: number): Queue;
    sort(predicate?: (a: Song, b: Song) => number): Array<Song>;
    shuffle(): void;
    set<T extends Record<string, any>>(data?: T): void;
    set<T>(key: string, value: T): void;
    get<T extends Record<string, any>>(): T;
    get<T>(key: string): T | null;
}
export type Addable = string | Track | Song;
export interface QueueEvents {
    trackStart: (song: Song) => void;
    trackEnd: (song: Song) => void;
    finish: () => void;
}
export interface Loop {
    type: LoopType;
    current: number;
    max: number;
}
export interface AddOptions {
    requester?: Snowflake | DiscordResource;
    next?: boolean;
}

export class Song implements TrackInfo {
    readonly track: string;
    readonly requester?: string;
    length: number;
    identifier: string;
    author: string;
    isStream: boolean;
    position: number;
    title: string;
    uri: string;
    isSeekable: boolean;
    sourceName: string;
    constructor(track: string | Track, requester?: string);
}

export function load(queueClass?: typeof Queue): void;
