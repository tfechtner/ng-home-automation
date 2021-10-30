import { DEVICE_KEYS, DEVICE_TYPES_ENUM, ROOMS_ENUM } from '../../config/main';
import { IFibaroDto } from '../../fibaro/interfaces';
import { SonosCoordinator } from '../../sonos/dto/sonosCoordinator.dto';

export interface IDeviceBaseDto<T> {
    key: DEVICE_KEYS;
    type: DEVICE_TYPES_ENUM;
    name: string;
    room: ROOMS_ENUM;
    roomName: string;
    fibaroId?: number;
    sonosUuid?: string;
    device?: T;
}

export interface IFibaroDeviceDto extends IDeviceBaseDto<IFibaroDto> {}
export interface ISonosDeviceDto extends IDeviceBaseDto<SonosCoordinator> {}

export type DeviceTypes = IFibaroDeviceDto | ISonosDeviceDto;
