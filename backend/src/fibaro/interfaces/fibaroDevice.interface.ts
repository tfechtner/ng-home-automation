export interface IFibaroDevice {
    id: number;
    name: string;
    roomID: number;
    type: string;
    baseType: string;
    enabled: boolean;
    visible: boolean;
    isPlugin: boolean;
    parentId: number;
    remoteGatewayId: number;
    viewXml: boolean;
    configXml: boolean;
    created: number;
    modified: number;
    sortOrder: number;
    properties: any;
    actions: any;
}
