"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mayStartNext = exports.TrackEndReason = void 0;
/**
 * The different end reasons.
 */
var TrackEndReason;
(function (TrackEndReason) {
    /**
     * This means the track itself emitted a terminator. This is usually caused by the track reaching the end,
     * however it will also be used when it ends due to an exception.
     */
    TrackEndReason["Finished"] = "FINISHED";
    /**
     * This means that the track failed to start, throwing an exception before providing any audio.
     */
    TrackEndReason["LoadFailed"] = "LOAD_FAILED";
    /**
     * The track was stopped due to the player being stopped by the "stop" operation.
     */
    TrackEndReason["Stopped"] = "STOPPED";
    /**
     * The track stopped playing because a new track started playing. Note that with this reason, the old track will still
     * play until either it's buffer runs out or audio from the new track is available.
     */
    TrackEndReason["Replaced"] = "REPLACED";
    /**
     * The track was stopped because the cleanup threshold for the audio player has reached. This triggers when the amount
     * of time passed since the last frame fetch has reached the threshold specified in the player manager.
     * This may also indicate either a leaked audio player which has discarded, but not stopped.
     */
    TrackEndReason["Cleanup"] = "CLEANUP";
})(TrackEndReason = exports.TrackEndReason || (exports.TrackEndReason = {}));
/**
 *
 */
exports.mayStartNext = {
    [TrackEndReason.Finished]: true,
    [TrackEndReason.LoadFailed]: true,
    [TrackEndReason.Stopped]: false,
    [TrackEndReason.Replaced]: false,
    [TrackEndReason.Cleanup]: false,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFlQTs7R0FFRztBQUNILElBQVksY0E2Qlg7QUE3QkQsV0FBWSxjQUFjO0lBQ3hCOzs7T0FHRztJQUNILHVDQUFxQixDQUFBO0lBRXJCOztPQUVHO0lBQ0gsNENBQTBCLENBQUE7SUFFMUI7O09BRUc7SUFDSCxxQ0FBbUIsQ0FBQTtJQUVuQjs7O09BR0c7SUFDSCx1Q0FBcUIsQ0FBQTtJQUVyQjs7OztPQUlHO0lBQ0gscUNBQW1CLENBQUE7QUFDckIsQ0FBQyxFQTdCVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQTZCekI7QUFFRDs7R0FFRztBQUNVLFFBQUEsWUFBWSxHQUFvQztJQUMzRCxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJO0lBQy9CLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUk7SUFDakMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSztJQUMvQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLO0lBQ2hDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUs7Q0FDaEMsQ0FBQyJ9