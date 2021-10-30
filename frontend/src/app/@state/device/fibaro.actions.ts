export namespace DeviceActions {

    export class GetDevices {
        public static readonly type = '[Device] Get Devices';
    }

    export class GetDevice {
        public static readonly type = '[Device] Get Device';
        constructor(public payload: { id: number }) {}
    }

    export class GetFibaroRooms {
        public static readonly type = '[Fibaro] Get Rooms';
    }
}
