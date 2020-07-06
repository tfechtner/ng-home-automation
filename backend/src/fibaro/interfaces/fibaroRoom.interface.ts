export interface IFibaroRoom {
    id: number;
    name: string;
    sectionID: number;
    icon: string;
    defaultSensors: {
        temperature: number;
        humidity: number;
        light: number
    };
    defaultThermostat: number;
    sortOrder: number;
    category: string;
}
