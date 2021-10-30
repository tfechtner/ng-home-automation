import { FibaroDeviceTypeEnum } from './fibaroDeviceTypeEnum';

export interface IFibaroDeviceProperties {
    unit: string;
    value: string;
}

export interface IFibaroDeviceActions {
    pollingDeadDevice: number;
    pollingTimeSec: number;
    reconfigure: number;
    requestNodeNeighborUpdate: number;
    turnOff: number;
    turnOn: number;
}

export interface IFibaroDevice {
    id: number;
    name: string;
    roomID: number;
    type: FibaroDeviceTypeEnum;
    baseType: string;
    enabled: boolean;
    visible: boolean;
    isPlugin: boolean;
    parentId: number;
    remoteGatewayId: number;
    viewXml: boolean;
    configXml: boolean;
    interfaces: string[];
    created: number;
    modified: number;
    sortOrder: number;
    properties: IFibaroDeviceProperties;
    actions: IFibaroDeviceActions;
}

export interface IFibaroDto {
    name: string;
    roomID: number;
    properties: {
        unit: string;
        value: string;
    };
}

export const fibaroDtoDefaults = {
    name: null,
    roomID: null,
    properties: {
        unit: null,
        value: null
    }
};
