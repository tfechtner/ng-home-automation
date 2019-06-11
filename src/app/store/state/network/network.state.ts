import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { State, Action, StateContext } from '@ngxs/store';
import { NetworkActions } from './network.actions';
import { NestJsService } from '../../../services/nestJs/nestJs.service';
import { GetStateDto } from '../../../services/nestJs/dto/getState.dto';

export interface INetworkStateModel {
    isApiConnected: boolean;
}

export const defaults: INetworkStateModel = {
    isApiConnected: null,
};

@State<INetworkStateModel>({
    name: 'Network',
    defaults
})
export class NetworkState {

    constructor(
        private _nestJsService: NestJsService
    ) {}

    @Action(NetworkActions.GetApiState)
    getApiState(
        { setState }: StateContext<INetworkStateModel>
    ) {
        return this._nestJsService.getApiState().pipe(
            take(1),
            tap(  (apiState: GetStateDto) => {
                if (apiState && apiState.data === 'ok') {
                    setState({ isApiConnected: true });
                }
            }),
            catchError((error) => {
                setState({ isApiConnected: false });
                return of('Error on NetworkActions.GetApiState = ' + error);
            })
        );
    }
}
