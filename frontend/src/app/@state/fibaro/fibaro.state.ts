import { Injectable } from '@angular/core';
import { IFibaroDevice, IFibaroDevices } from '@backend/fibaro/interfaces';
import { IFibaroRooms } from '@backend/fibaro/interfaces/fibaroRooms.interface';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NestService } from '@services/nest/nest.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FibaroActions } from './fibaro.actions';

export interface IFibaroStateModel {
    devices: IFibaroDevices;
    rooms: IFibaroRooms;
}

export const defaults: IFibaroStateModel = {
    devices: [],
    rooms: []
};

@State<IFibaroStateModel>({
    name: 'Fibaro',
    defaults
})
@Injectable()
export class FibaroState {

    @Selector()
    public static devices(state: IFibaroStateModel): IFibaroDevices {
        return state.devices;
    }

    @Selector()
    public static rooms(state: IFibaroStateModel): IFibaroRooms {
        return state.rooms;
    }

    constructor(
        private _nestService: NestService
    ) {}

    @Action(FibaroActions.GetDevices)
    getDevices(
        { patchState }: StateContext<IFibaroStateModel>
    ): Observable<any> {
        return this._nestService.getFibaroDevices().pipe(
            tap( (devices: IFibaroDevices) => {
                patchState({ devices: devices });
            }),
            catchError((error) => {
                return of('Error on FibaroActions.GetDevices = ' + error);
            })
        );
    }

    @Action(FibaroActions.GetDevice)
    getDevice(
        { getState, patchState }: StateContext<IFibaroStateModel>,
        { payload }: FibaroActions.GetDevice
    ): Observable<any> {
        return this._nestService.getFibaroDevice(payload.id).pipe(
            tap( (deviceData: IFibaroDevice) => {
                const devices = [ ...getState().devices ];
                console.log(devices);
                console.log(deviceData.properties.value);
                const index = devices.findIndex(device => device.id === payload.id);
                console.log(devices[index].properties.value);
                const newDevice: IFibaroDevice = {
                    ...deviceData,
                    properties: deviceData.properties
                };
                console.log(newDevice);
                devices[index] = newDevice;

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

    @Action(FibaroActions.GetRooms)
    getRooms(
        { patchState }: StateContext<IFibaroStateModel>
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
