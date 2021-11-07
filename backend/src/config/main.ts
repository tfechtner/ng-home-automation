const ROOMS = [
    {
        id: 0,
        name: 'Lounge',
        urlName: 'lounge',
        sonosKey: 'lounge'
    },
    {
        id: 1,
        name: 'Bedroom',
        urlName: 'bedroom',
        sonosKey: 'bedroom'
    }
];

export enum DEVICE_KEYS {
    MAIN_BEDROOM_LIGHTS = 'MAIN_BEDROOM_LIGHTS',
    MAIN_BEDROOM_SENSOR = 'MAIN_BEDROOM_SENSOR',
    MAIN_BEDROOM_THERMOSTAT = 'MAIN_BEDROOM_THERMOSTAT',
    MAIN_BEDROOM_BED_LEFT_LIGHT = 'MAIN_BEDROOM_BED_LEFT_LIGHT',
    MAIN_BEDROOM_BED_RIGHT_LIGHT = 'MAIN_BEDROOM_BED_RIGHT_LIGHT',
    MAIN_BEDROOM_SPEAKER = 'MAIN_BEDROOM_SPEAKER',
    DRESSING_ROOM_LIGHTS = 'DRESSING_ROOM_LIGHTS',
    DRESSING_ROOM_SENSOR = 'DRESSING_ROOM_SENSOR',
    DRESSING_ROOM_THERMOSTAT = 'DRESSING_ROOM_THERMOSTAT',
    DRESSING_ROOM_SHELF_LIGHTS = 'DRESSING_ROOM_SHELF_LIGHTS',
    ENSUITE_BATHROOM_SPEAKER = 'ENSUITE_BATHROOM_SPEAKER',
    FAMILY_BATHROOM_SPEAKER = 'FAMILY_BATHROOM_SPEAKER',
    STUDY_SENSOR = 'STUDY_SENSOR',
    STUDY_THERMOSTAT = 'STUDY_THERMOSTAT',
    KITCHEN_MOULD_SENSOR = 'KITCHEN_MOULD_SENSOR',
    KITCHEN_THERMOSTAT = 'KITCHEN_THERMOSTAT',
    KITCHEN_HUMIDITY = 'KITCHEN_HUMIDITY',
    KITCHEN_DEW_POINT = 'KITCHEN_DEW_POINT',
    KITCHEN_HEAT_DETECTOR = 'KITCHEN_HEAT_DETECTOR',
    KITCHEN_SPEAKER = 'KITCHEN_SPEAKER',
    GARAGE_BOOT_ROOM_DOOR_SENSOR = 'GARAGE_BOOT_ROOM_DOOR_SENSOR',
    BOOT_ROOM_SENSOR = 'BOOT_ROOM_SENSOR',
    BOOT_ROOM_THERMOSTAT = 'BOOT_ROOM_THERMOSTAT',
    UTILITY_MOULD_SENSOR = 'UTILITY_MOULD_SENSOR',
    UTILITY_THERMOSTAT = 'UTILITY_THERMOSTAT',
    UTILITY_HUMIDITY = 'UTILITY_HUMIDITY',
    UTILITY_DEW_POINT = 'UTILITY_DEW_POINT',
    UTILITY_HEAT_DETECTOR = 'UTILITY_HEAT_DETECTOR',
    DOORBELL = 'DOORBELL',
    SIDE_PATH_SENSOR = 'SIDE_PATH_SENSOR',
    PATIO_SENSOR = 'PATIO_SENSOR',
    FRONT_CAMERA = 'FRONT_CAMERA',
    HALL_CAMERA = 'HALL_CAMERA',
    PATIO_CAMERA = 'PATIO_CAMERA'
}

export enum DEVICE_TYPES_ENUM {
    LIGHT_SWITCH = 'LIGHT_SWITCH',
    LIGHT_DIMMER = 'LIGHT_DIMMER',
    LIGHT_RGBW = 'LIGHT_RGBW',
    SENSOR_DOOR = 'SENSOR_DOOR',
    SENSOR_MOTION = 'SENSOR_MOTION',
    SENSOR_THERMOSTAT = 'SENSOR_THERMOSTAT',
    SENSOR_MOULD = 'SENSOR_MOULD',
    SENSOR_HUMIDITY = 'SENSOR_HUMIDITY',
    SENSOR_DEW_POINT = 'SENSOR_DEW_POINT',
    SENSOR_HEAT_DETECTOR = 'SENSOR_HEAT_DETECTOR',
    SPEAKER = 'SPEAKER',
    CAMERA = 'CAMERA',
    DOORBELL = 'DOORBELL'
}

export const DEVICE_TYPE_NAMES = {
    LIGHT_SWITCH: 'Light Switch',
    LIGHT_DIMMER: 'Light Dimmer',
    LIGHT_RGBW: 'Colour Light',
    SENSOR_DOOR: 'Door Sensor',
    SENSOR_MOTION: 'Motion Sensor',
    SENSOR_THERMOSTAT: 'Thermostat',
    SENSOR_MOULD: 'Mould Sensor',
    SENSOR_HUMIDITY: 'Humidity Sensor',
    SENSOR_DEW_POINT: 'Dew Point Sensor',
    SENSOR_HEAT_DETECTOR: 'Heat Detection Sensor',
    SPEAKER: 'Speaker',
    CAMERA: 'Camera',
    DOORBELL: 'Doorbell'
};

export enum ROOMS_ENUM {
    MAIN_BEDROOM = 'MAIN_BEDROOM',
    DRESSING_ROOM = 'DRESSING_ROOM',
    ENSUITE_BATHROOM = 'ENSUITE_BATHROOM',
    FAMILY_BATHROOM = 'FAMILY_BATHROOM',
    STUDY = 'STUDY',
    HALL = 'HALL',
    KITCHEN = 'KITCHEN',
    BOOT_ROOM = 'BOOT_ROOM',
    UTILITY = 'UTILITY',
    SIDE_PATH = 'SIDE_PATH',
    GARDEN = 'GARDEN',
    FRONT_GARDEN = 'FRONT_GARDEN'
}

export const ROOM_NAMES = {
    MAIN_BEDROOM: 'Main Bedroom',
    DRESSING_ROOM: 'Dressing Room',
    ENSUITE_BATHROOM: 'Ensuite Bathroom',
    FAMILY_BATHROOM: 'Family Bathroom',
    STUDY: 'Study',
    HALL: 'Hall',
    KITCHEN: 'Kitchen',
    BOOT_ROOM: 'Boot Room',
    UTILITY: 'Utility',
    SIDE_PATH: 'Side Path',
    GARDEN: 'Garden',
    FRONT_GARDEN: 'Front Garden'
};

export const DEVICES_MAP = new Map<string, any>([
    [
        DEVICE_KEYS.MAIN_BEDROOM_LIGHTS, {
        type: DEVICE_TYPES_ENUM.LIGHT_DIMMER,
        name: 'Lights',
        room: ROOMS_ENUM.MAIN_BEDROOM,
        fibaroId: null
    }],
    [
        DEVICE_KEYS.MAIN_BEDROOM_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Main Bedroom Motion Sensor',
        room: ROOMS_ENUM.MAIN_BEDROOM,
        fibaroId: 109,
        battery: null
    }],
    [
        DEVICE_KEYS.MAIN_BEDROOM_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Main Bedroom Temperature Sensor',
        room: ROOMS_ENUM.MAIN_BEDROOM,
        fibaroId: 110
    }],
    [
        DEVICE_KEYS.MAIN_BEDROOM_BED_LEFT_LIGHT, {
        type: DEVICE_TYPES_ENUM.LIGHT_SWITCH,
        name: 'Tom\'s Bedside Light',
        room: ROOMS_ENUM.MAIN_BEDROOM,
        fibaroId: null
    }],
    [
        DEVICE_KEYS.MAIN_BEDROOM_BED_RIGHT_LIGHT, {
        type: DEVICE_TYPES_ENUM.LIGHT_SWITCH,
        name: 'Piotr\'s Bedside Light',
        room: ROOMS_ENUM.MAIN_BEDROOM,
        fibaroId: null
    }],
    [
        DEVICE_KEYS.MAIN_BEDROOM_SPEAKER, {
        type: DEVICE_TYPES_ENUM.SPEAKER,
        name: 'Main Bedroom Speaker',
        room: ROOMS_ENUM.MAIN_BEDROOM,
        sonosRoomName: 'Bedroom'
    }],
    [
        DEVICE_KEYS.DRESSING_ROOM_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Dressing Room Motion Sensor',
        room: ROOMS_ENUM.DRESSING_ROOM,
        fibaroId: 115,
        battery: null
    }],
    [
        DEVICE_KEYS.DRESSING_ROOM_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Dressing Room Temperature Sensor',
        room: ROOMS_ENUM.DRESSING_ROOM,
        fibaroId: 116
    }],
    [
        DEVICE_KEYS.DRESSING_ROOM_LIGHTS, {
        type: DEVICE_TYPES_ENUM.LIGHT_SWITCH,
        name: 'Lights',
        room: ROOMS_ENUM.DRESSING_ROOM,
        fibaroId: null
    }],
    [
        DEVICE_KEYS.DRESSING_ROOM_SHELF_LIGHTS, {
        type: DEVICE_TYPES_ENUM.LIGHT_SWITCH,
        name: 'Shelf Lights',
        room: ROOMS_ENUM.DRESSING_ROOM,
        fibaroId: null
    }],
    [
        DEVICE_KEYS.ENSUITE_BATHROOM_SPEAKER, {
        type: DEVICE_TYPES_ENUM.SPEAKER,
        name: 'Ensuite Bathroom Speaker',
        room: ROOMS_ENUM.ENSUITE_BATHROOM,
        sonosRoomName: 'Ensuite Bathroom'
    }],
    [
        DEVICE_KEYS.FAMILY_BATHROOM_SPEAKER, {
        type: DEVICE_TYPES_ENUM.SPEAKER,
        name: 'Family Bathroom Speaker',
        room: ROOMS_ENUM.FAMILY_BATHROOM,
        sonosRoomName: 'Family Bathroom'
    }],
    [
        DEVICE_KEYS.STUDY_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Study Motion Sensor',
        room: ROOMS_ENUM.STUDY,
        fibaroId: 121,
        battery: null
    }],
    [
        DEVICE_KEYS.STUDY_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Study Temperature Sensor',
        room: ROOMS_ENUM.STUDY,
        fibaroId: 122
    }],
    [
        DEVICE_KEYS.KITCHEN_MOULD_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOULD,
        name: 'Kitchen Mould Sensor',
        room: ROOMS_ENUM.KITCHEN,
        fibaroId: 154,
        battery: null
    }],
    [
        DEVICE_KEYS.KITCHEN_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Kitchen Temperature Sensor',
        room: ROOMS_ENUM.KITCHEN,
        fibaroId: 155
    }],
    [
        DEVICE_KEYS.KITCHEN_HUMIDITY, {
        type: DEVICE_TYPES_ENUM.SENSOR_HUMIDITY,
        name: 'Kitchen Humidity Sensor',
        room: ROOMS_ENUM.KITCHEN,
        fibaroId: 156
    }],
    [
        DEVICE_KEYS.KITCHEN_DEW_POINT, {
        type: DEVICE_TYPES_ENUM.SENSOR_DEW_POINT,
        name: 'Kitchen Dew Point Sensor',
        room: ROOMS_ENUM.KITCHEN,
        fibaroId: 157
    }],
    [
        DEVICE_KEYS.KITCHEN_HEAT_DETECTOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_HEAT_DETECTOR,
        name: 'Kitchen Heat Detector Sensor',
        room: ROOMS_ENUM.KITCHEN,
        fibaroId: 158
    }],
    [
        DEVICE_KEYS.KITCHEN_SPEAKER, {
        type: DEVICE_TYPES_ENUM.SPEAKER,
        name: 'Kitchen Speaker',
        room: ROOMS_ENUM.KITCHEN,
        sonosRoomName: 'Kitchen'
    }],
    [
        DEVICE_KEYS.GARAGE_BOOT_ROOM_DOOR_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_DOOR,
        name: 'Boot Room Door Sensor',
        room: ROOMS_ENUM.BOOT_ROOM,
        fibaroId: 92,
        battery: null
    }],
    [
        DEVICE_KEYS.BOOT_ROOM_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Boot Room Motion Sensor',
        room: ROOMS_ENUM.BOOT_ROOM,
        fibaroId: 26,
        battery: null
    }],
    [
        DEVICE_KEYS.BOOT_ROOM_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Boot Room Temperature Sensor',
        room: ROOMS_ENUM.BOOT_ROOM,
        fibaroId: 27
    }],
    [
        DEVICE_KEYS.UTILITY_MOULD_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOULD,
        name: 'Utility Mould Sensor',
        room: ROOMS_ENUM.UTILITY,
        fibaroId: 143,
        battery: null
    }],
    [
        DEVICE_KEYS.UTILITY_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Utility Temperature Sensor',
        room: ROOMS_ENUM.UTILITY,
        fibaroId: 144
    }],
    [
        DEVICE_KEYS.UTILITY_HUMIDITY, {
        type: DEVICE_TYPES_ENUM.SENSOR_HUMIDITY,
        name: 'Utility Humidity Sensor',
        room: ROOMS_ENUM.UTILITY,
        fibaroId: 145
    }],
    [
        DEVICE_KEYS.UTILITY_DEW_POINT, {
        type: DEVICE_TYPES_ENUM.SENSOR_DEW_POINT,
        name: 'Utility Dew Point Sensor',
        room: ROOMS_ENUM.UTILITY,
        fibaroId: 146
    }],
    [
        DEVICE_KEYS.UTILITY_HEAT_DETECTOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_HEAT_DETECTOR,
        name: 'Utility Heat Detector Sensor',
        room: ROOMS_ENUM.UTILITY,
        fibaroId: 147
    }],
    [
        DEVICE_KEYS.SIDE_PATH_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Side Path Motion Sensor',
        room: ROOMS_ENUM.SIDE_PATH,
        fibaroId: 83
    }],
    [
        DEVICE_KEYS.PATIO_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Patio Motion Sensor',
        room: ROOMS_ENUM.GARDEN,
        fibaroId: 132
    }],
    [
        DEVICE_KEYS.DOORBELL, {
        type: DEVICE_TYPES_ENUM.DOORBELL,
        name: 'Doorbell',
        room: ROOMS_ENUM.FRONT_GARDEN,
        ringId: 81053880,
        battery: null
    }],
    [
        DEVICE_KEYS.FRONT_CAMERA, {
        type: DEVICE_TYPES_ENUM.CAMERA,
        name: 'Front Camera',
        room: ROOMS_ENUM.FRONT_GARDEN
    }],
    [
        DEVICE_KEYS.HALL_CAMERA, {
        type: DEVICE_TYPES_ENUM.CAMERA,
        name: 'Hall Camera',
        room: ROOMS_ENUM.HALL
    }],
    [
        DEVICE_KEYS.PATIO_CAMERA, {
        type: DEVICE_TYPES_ENUM.CAMERA,
        name: 'Patio Camera',
        room: ROOMS_ENUM.GARDEN
    }]
]);

export function getDeviceByProperty(property: string, value: any): any {
    DEVICES_MAP.forEach((device: any) => {
        if (device[property] === value) {
            return device;
        }
    });
    return null;
}

const config = {
    DEVICES_MAP,
    ROOMS,
    getDeviceByProperty
};

export const CONFIG = config;
