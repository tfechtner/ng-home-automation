export enum FibaroEventType {
    MOTION_DETECTED = 'motion-detected',
    TEMPERATURE_CHANGED = 'temperature-changed'
}

export interface FibaroEvent {
    type: FibaroEventType;
    data: object;
}
