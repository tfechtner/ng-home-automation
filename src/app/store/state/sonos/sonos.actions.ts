export namespace SonosActions {

    export class GetZones {
        public static readonly type = '[Sonos] Get Zones';
    }

    export class RoomGetState {
        public static readonly type = '[Sonos] Room Get State';
        constructor(public payload: { room: string}) {}
    }
}
