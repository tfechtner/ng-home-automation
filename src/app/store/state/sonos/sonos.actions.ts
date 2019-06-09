export namespace SonosActions {

    export class RoomGetState {
        public static readonly type = '[Sonos] Room Get State';

        constructor(public payload: { room: string}) {
        }
    }
}
