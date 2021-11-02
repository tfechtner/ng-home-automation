import { DEVICE_KEYS, DEVICE_TYPES_ENUM, ROOMS_ENUM } from '../../config/main';
import { IFibaroDto } from '../../fibaro/interfaces';
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
    hasBattery?: boolean;
    device?: T;
}

export interface IFibaroDeviceDto extends IDeviceBaseDto<IFibaroDto> {}
export interface ISonosDeviceDto extends IDeviceBaseDto<ISonosDto> {}

export type DeviceTypes = IFibaroDeviceDto | ISonosDeviceDto;
