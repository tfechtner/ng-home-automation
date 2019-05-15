import { State, Action, StateContext } from '@ngxs/store';
import { StoreAction } from './store.actions';

export class StoreStateModel {
    public items: string[];
}

@State<StoreStateModel>({
    name: 'store',
    defaults: {
        items: []
    }
})
export class StoreState {
    @Action(StoreAction)
    add(ctx: StateContext<StoreStateModel>, action: StoreAction) {
        const state = ctx.getState();
        ctx.setState({items: [...state.items, action.payload]});
    }
}
