import { DEVICE_KEYS, DEVICE_TYPES_ENUM, ROOMS_ENUM } from '../../config/main';
import { IFibaroDto } from '../../fibaro/interfaces';
import { ISonosCoordinatorDto } from '../../sonos/dto/sonosCoordinator.dto';

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
export interface ISonosDeviceDto extends IDeviceBaseDto<ISonosCoordinatorDto> {}

export type DeviceTypes = IFibaroDeviceDto | ISonosDeviceDto;
