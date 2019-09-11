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
}
