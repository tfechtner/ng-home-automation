import { CameraData, CameraHealth } from 'ring-client-api/lib/api/ring-types';

export interface IRing extends CameraData {}

export interface IRingHealth extends CameraHealth {}

export interface IRingDto {
    battery: number;
}

export interface IRingDto {
    battery: number;
}

export interface IRingHealthDto {
    battery: number;
}

export const ringHealthDtoDefaults = {
    battery: null
};
