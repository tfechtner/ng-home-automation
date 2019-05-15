export class StoreAction {
    static readonly type = '[Store] Add item';

    constructor(public payload: string) {
    }
}
