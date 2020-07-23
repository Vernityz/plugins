// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../lavaclient
//   ../http
//   ../@kyflx-dev/lavalink-types

import type { Manager, Plugin, Socket } from "lavaclient";
import type { RequestOptions } from "http";
import type * as Lava from "@lavaclient/types";

declare module "lavaclient" {
  import { REST } from "@lavaclient/rest";

  interface Socket {
    rest: REST;
  }
}

declare namespace LavaClientREST {
  export class RESTPlugin extends Plugin {
    /**
     * The REST class we're going to use.
     */
    rest: typeof REST;

    /**
     * @param rest
     */
    constructor(rest: typeof REST);

    init(): void;
  }

  export class REST {
    readonly socket: Socket;

    /**
     * @param socket
     */
    constructor(socket: Socket);

    /**
     * The player manager.
     */
    get manager(): Manager;

    /**
     * Load lavaplayer tracks.
     * @param identifier - Search identifier.
     */
    resolve(identifier: string): Promise<Lava.LoadTrackResponse>;

    /**
     * Decode a lavaplayer track into Track Info.
     * @param track - The base64 lavaplayer track.
     * @since Lavalink v1
     */
    decode(track: string): Promise<Lava.TrackInfo>;

    /**
     * Route Planner - Returns the route planner status.
     * @since Lavalink v3.2.2
     */
    routePlannerStatus(): Promise<Lava.RoutePlanner>;

    /**
     * Route Planner - Unmark a failing address.
     * @param address - The failing address.
     * @since Lavalink v3.2.2
     */
    unmarkFailingAddress(address: string): Promise<void>;

    /**
     * Route Planner - Unmark all failing addresses.
     * @since v3.2.2
     */
    unmarkAllFailingAddresses(): Promise<void>;

    /**
     * Make a request to lavalink.
     * @since 1.0.0
     */
    protected make(path: string, options?: RequestOptions, body?: any): Promise<any>;
  }
}

export = LavaClientREST;
