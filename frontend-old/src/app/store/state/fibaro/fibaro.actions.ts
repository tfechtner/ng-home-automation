export namespace FibaroActions {

    export class GetDevices {
        public static readonly type = '[Fibaro] Get Devices';
    }

    export class GetDevice {
        public static readonly type = '[Fibaro] Get Device';
        constructor(public payload: { id: number }) {}
    }

    export class GetRooms {
        public static readonly type = '[Fibaro] Get Rooms';
    }
}
