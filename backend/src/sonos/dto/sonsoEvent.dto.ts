export enum SonosEventType {
    VOLUME_CHANGE = 'volume-change',
    TRANSPORT_STATE = 'transport-state'
}

export interface SonosEvent {
    type: SonosEventType;
    data: object;
}
