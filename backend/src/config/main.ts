import { IDevice } from '../devices/models/device';

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
    DRESSING_ROOM_LIGHTS = 'DRESSING_ROOM_LIGHTS',
    DRESSING_ROOM_SENSOR = 'DRESSING_ROOM_SENSOR',
    DRESSING_ROOM_THERMOSTAT = 'DRESSING_ROOM_THERMOSTAT',
    DRESSING_ROOM_SHELF_LIGHTS = 'DRESSING_ROOM_SHELF_LIGHTS',
    STUDY_SENSOR = 'STUDY_SENSOR',
    STUDY_THERMOSTAT = 'STUDY_THERMOSTAT',
    GARAGE_BOOT_ROOM_DOOR_SENSOR = 'GARAGE_BOOT_ROOM_DOOR_SENSOR',
    BOOT_ROOM_SENSOR = 'BOOT_ROOM_SENSOR',
    BOOT_ROOM_THERMOSTAT = 'BOOT_ROOM_THERMOSTAT',
    UTILITY_MOULD_SENSOR = 'UTILITY_MOULD_SENSOR',
    UTILITY_THERMOSTAT = 'UTILITY_THERMOSTAT',
    UTILITY_HUMIDITY = 'UTILITY_HUMIDITY',
    UTILITY_DEW_POINT = 'UTILITY_DEW_POINT',
    UTILITY_HEAT_DETECTOR = 'UTILITY_HEAT_DETECTOR',
    SIDE_PATH_SENSOR = 'SIDE_PATH_SENSOR',
    PATIO_SENSOR = 'PATIO_SENSOR'
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
    CAMERA = 'CAMERA'
}

export enum ROOMS_ENUM {
    MAIN_BEDROOM = 'MAIN_BEDROOM',
    DRESSING_ROOM = 'DRESSING_ROOM',
    STUDY = 'STUDY',
    BOOT_ROOM = 'BOOT_ROOM',
    UTILITY = 'UTILITY',
    SIDE_PATH = 'SIDE_PATH',
    GARDEN = 'GARDEN'
}

export const DEVICES_MAP = new Map<string, IDevice>([
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
        fibaroId: 109
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
        DEVICE_KEYS.DRESSING_ROOM_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Dressing Room Motion Sensor',
        room: ROOMS_ENUM.DRESSING_ROOM,
        fibaroId: 115
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
        DEVICE_KEYS.STUDY_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Study Motion Sensor',
        room: ROOMS_ENUM.STUDY,
        fibaroId: 121
    }],
    [
        DEVICE_KEYS.STUDY_THERMOSTAT, {
        type: DEVICE_TYPES_ENUM.SENSOR_THERMOSTAT,
        name: 'Study Temperature Sensor',
        room: ROOMS_ENUM.STUDY,
        fibaroId: 122
    }],
    [
        DEVICE_KEYS.GARAGE_BOOT_ROOM_DOOR_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_DOOR,
        name: 'Boot Room Door Sensor',
        room: ROOMS_ENUM.BOOT_ROOM,
        fibaroId: 92
    }],
    [
        DEVICE_KEYS.BOOT_ROOM_SENSOR, {
        type: DEVICE_TYPES_ENUM.SENSOR_MOTION,
        name: 'Boot Room Motion Sensor',
        room: ROOMS_ENUM.BOOT_ROOM,
        fibaroId: 26
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
        fibaroId: 143
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
    }]
]);

const config = {
    DEVICES_MAP,
    ROOMS
};

export const CONFIG = config;
