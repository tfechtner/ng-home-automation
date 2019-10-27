import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { State, Action, StateContext } from '@ngxs/store';
import { NestService } from '../../../services/nest/nest.service';
import { FibaroActions } from './fibaro.actions';
import { IFibaroDevice, IFibaroDevices } from '../../../../../../backend/src/fibaro/interfaces';

export interface IFibaroStateModel {
    devices: IFibaroDevices;
}

export const defaults: IFibaroStateModel = {
    devices: []
};

@State<IFibaroStateModel>({
    name: 'Fibaro',
    defaults
})
export class FibaroState {

    constructor(
        private _nestService: NestService
    ) {}

    @Action(FibaroActions.GetDevices)
    getDevices(
        { setState }: StateContext<IFibaroStateModel>
    ): Observable<any> {
        return this._nestService.getFibaroDevices().pipe(
            tap( (devices: IFibaroDevices) => {
                setState({ devices: devices });
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
                let devices = [ ...getState().devices ];
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
}
