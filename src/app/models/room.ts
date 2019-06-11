export interface IRoom {
    _id: number;
    _name: string;
    _sonosKey: string;
    _icon: string;
}

export const roomDefaults: IRoom = {
    _id: null,
    _name: null,
    _sonosKey: null,
    _icon: null
};

export class Room {

    private _id: number;
    private _name: string;
    private _sonosKey: string;
    private _icon: string;

    constructor(initObject: object) {
        Object.assign(this, roomDefaults, initObject);
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get sonosKey(): string {
        return this._sonosKey;
    }

    get icon() {
        return this._icon;
    }
}
