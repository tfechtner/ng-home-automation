import { Injectable } from '@angular/core';
import { DEVICE_TYPES_ENUM } from '@backend/config/main';
import { DeviceTypes, IFibaroDeviceDto, ISonosDeviceDto } from '@backend/devices/models/device';
import { IFibaroDevice } from '@backend/fibaro/interfaces';
import { IFibaroRooms } from '@backend/fibaro/interfaces/fibaroRooms.interface';
import { Device } from '@models/device/device';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NestService } from '@services/nest/nest.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DeviceActions } from './fibaro.actions';

export interface IDeviceStateModel {
    devices: DeviceTypes[];
    rooms: IFibaroRooms;
}

export const defaults: IDeviceStateModel = {
    devices: [],
    rooms: []
};

@State<IDeviceStateModel>({
    name: 'Device',
    defaults
})
@Injectable()
export class DeviceState {

    @Selector()
    public static devices(state: IDeviceStateModel): DeviceTypes[] {
        return state.devices.map(device => new Device(device));
    }

    @Selector()
    public static rooms(state: IDeviceStateModel): IFibaroRooms {
        return state.rooms;
    }

    @Selector()
    public static thermostats(state: IDeviceStateModel): DeviceTypes[] {
        return state.devices.filter(device => device.type === DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT);
    }

    @Selector()
    public static batteries(state: IDeviceStateModel): DeviceTypes[] {
        return state.devices.filter((device: IFibaroDeviceDto) => device.hasBattery);
    }

    @Selector()
    public static speakers(state: IDeviceStateModel): DeviceTypes[] {
        return state.devices.filter((device: ISonosDeviceDto) => !!device.sonosRoomName);
    }

    constructor(
        private _nestService: NestService
    ) {}

    @Action(DeviceActions.GetDevices)
    getDevices(
        { patchState }: StateContext<IDeviceStateModel>
    ): Observable<any> {
        return this._nestService.getDevices().pipe(
            tap( (devices: DeviceTypes[]) => {
                patchState({ devices: devices });
            }),
            catchError((error) => {
                return of('Error on FibaroActions.GetDevices = ' + error);
            })
        );
    }

    @Action(DeviceActions.GetDevice)
    getDevice(
        { getState, patchState }: StateContext<IDeviceStateModel>,
        { payload }: DeviceActions.GetDevice
    ): Observable<any> {
        return this._nestService.getFibaroDevice(payload.id).pipe(
            tap( (deviceData: IFibaroDevice) => {
                const devices = [ ...getState().devices ];
                console.log(devices);
                console.log(deviceData.properties.value);
                // const index = devices.findIndex(device => device.id === payload.id);
                // console.log(devices[index].properties.value);
                const newDevice: IFibaroDevice = {
                    ...deviceData,
                    properties: deviceData.properties
                };
                console.log(newDevice);
                // devices[index] = newDevice;

                patchState({
                    ...getState(),
                    devices: [
                        ...devices
                    ]
                });
            }),
            catchError((error) => {
                console.log(error);
                return of('Error on FibaroActions.GetDevice = ' + error);
            })
        );
    }

    @Action(DeviceActions.GetFibaroRooms)
    getRooms(
        { patchState }: StateContext<IDeviceStateModel>
    ): Observable<any> {
        return this._nestService.getFibaroRooms().pipe(
            tap( (rooms: IFibaroRooms) => {
                patchState({ rooms: rooms });
            }),
            catchError((error) => {
                return of('Error on FibaroActions.GetRooms = ' + error);
            })
        );
    }
}
