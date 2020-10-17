export namespace SonosActions {

    export class GetZones {
        public static readonly type = '[Sonos] Get Zones';
    }

    export class GetRoomState {
        public static readonly type = '[Sonos] Get Room State';
        constructor(public payload: { room: string }) {}
    }

    export class RoomPlay {
        public static readonly type = '[Sonos] Room Play';
        constructor(public payload: { room: string }) {}
    }

    export class RoomPause {
        public static readonly type = '[Sonos] Room Pause';
        constructor(public payload: { room: string }) {}
    }

    export class RoomVolume {
        public static readonly type = '[Sonos] Room Volume';
        constructor(public payload: { room: string, volume: number }) {}
    }

    export class RoomMute {
        public static readonly type = '[Sonos] Room Mute';
        constructor(public payload: { room: string }) {}
    }

    export class RoomUnmute {
        public static readonly type = '[Sonos] Room Unmute';
        constructor(public payload: { room: string }) {}
    }

    export class RoomFavourite {
        public static readonly type = '[Sonos] Room Favourite';
        constructor(public payload: { room: string, favourite: string }) {}
    }
}
