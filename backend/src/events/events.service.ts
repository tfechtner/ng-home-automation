import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEVICE_KEYS, DEVICES_MAP } from '../config/main';
import { IDevice } from '../devices/models/device';
import { TelegramService } from '../telegram/telegram.service';
import { EventEntity } from './event.entity';

@Injectable()
export class EventsService {

    private _lastTriggeredMap = new Map<string, number>();

    constructor(
        @InjectRepository(EventEntity)
        private _eventRepository: Repository<EventEntity>,
        private _telegramService: TelegramService
    ) {}

    async findAll(): Promise<EventEntity[]> {
        return await this._eventRepository.find();
    }

    async create(event: EventEntity): Promise<EventEntity> {
        this._eventTriggers(event);
        return await this._eventRepository.save(event);
    }

    private _eventTriggers(event: EventEntity) {

        switch (event.deviceID) {
            case DEVICES_MAP.get(DEVICE_KEYS.MAIN_BEDROOM_SENSOR).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.DRESSING_ROOM_SENSOR).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.STUDY_SENSOR).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.BOOT_ROOM_SENSOR).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.GARAGE_BOOT_ROOM_DOOR_SENSOR).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.SIDE_PATH_SENSOR).fibaroId :
                this._sensorTriggered(event);
                break;
        }
    }

    private _sensorTriggered(event: EventEntity) {
        if (event.propertyName === 'value' && event.value === '1') {

            const deviceKey = this._findDeviceKey(event.deviceID);
            console.log('[ Event ] ' + deviceKey + ' triggered');

            const lastTriggered = this._lastTriggeredMap.get(deviceKey);

            if (!!lastTriggered) {
                if (this._getMinutesSince(lastTriggered) >= 1) {
                    this._setLastTriggered(deviceKey);

                    const deviceName = DEVICES_MAP.get(deviceKey).name;
                    this._telegramService.sendMessage(deviceName + ' triggered.').subscribe();
                }
            } else {
                this._setLastTriggered(deviceKey);
            }
        }
    }

    private _findDeviceKey(fibaroId: number): DEVICE_KEYS {
        let foundKey = null;
        DEVICES_MAP.forEach((device: IDevice, key: DEVICE_KEYS) => {
            if (device.fibaroId === fibaroId) {
                foundKey = key;
            }
        });
        return foundKey;
    }

    private _setLastTriggered(deviceKey: DEVICE_KEYS) {
        this._lastTriggeredMap.set(deviceKey, new Date().getTime());
    }

    private _getMinutesSince(milliseconds: number) {
        const current = new Date().getTime();
        return Math.round((current - milliseconds) / 1000 / 60);
    }
}
