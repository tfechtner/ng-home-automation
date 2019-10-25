import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { State, Action, StateContext } from '@ngxs/store';
import { NetworkActions } from './network.actions';
import { NestService } from '../../../services/nest/nest.service';
import { StateDto } from '../../../services/nest/dto/state.dto';

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
        private _nestService: NestService
    ) {}

    @Action(NetworkActions.GetApiState)
    getApiState(
        { setState }: StateContext<INetworkStateModel>
    ) {
        return this._nestService.getApiState().pipe(
            take(1),
            tap(  (apiState: StateDto) => {
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
