import { DEVICE_KEYS, DEVICE_TYPES_ENUM, ROOMS_ENUM } from '../../config/main';
import { IFibaroDto } from '../../fibaro/interfaces';
import { IRingHealthDto } from '../../ring/dto/ringDevice.interface';
import { ISonosDto } from '../../sonos/dto/sonosDevice.interface';

export interface IDeviceBaseDto<T> {
    key: DEVICE_KEYS;
    type: DEVICE_TYPES_ENUM;
    typeName?: string;
    name: string;
    room: ROOMS_ENUM;
    roomName: string;

    fibaroId?: number;
    sonosRoomName?: string;
    ringId?: number;

    device?: T;
    battery?: number;
}

export interface IFibaroDeviceDto extends IDeviceBaseDto<IFibaroDto> {}
export interface ISonosDeviceDto extends IDeviceBaseDto<ISonosDto> {}
export interface IRingDeviceDto extends IDeviceBaseDto<IRingHealthDto> {}

export type DeviceTypes = IFibaroDeviceDto | ISonosDeviceDto | IRingDeviceDto;
