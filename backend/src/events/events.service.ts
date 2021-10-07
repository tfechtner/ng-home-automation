import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEVICE_KEYS, DEVICES_MAP } from '../config/main';
import { IDevice } from '../devices/models/device';
import { FibaroEventType } from '../fibaro/dto/fibaroEvent.dto';
import { SettingHouseModeEnum } from '../settings/enums/settingHouseModes.enum';
import { SettingsService } from '../settings/settings.service';
import { TelegramService } from '../telegram/telegram.service';
import { NestWebsocketGateway } from '../websocket/nest-websocket.gateway';
import { EventEntity } from './event.entity';

@Injectable()
export class EventsService {

    private _lastTriggeredMap = new Map<string, number>();

    constructor(
        @InjectRepository(EventEntity)
        private _eventRepository: Repository<EventEntity>,
        private _nestWebsocketGateway: NestWebsocketGateway,
        private _telegramService: TelegramService,
        private _settingsService: SettingsService,
        private _logger: Logger
    ) {}

    async findAll(): Promise<EventEntity[]> {
        return await this._eventRepository.find({ take: 100, order: { id: 'DESC' } });
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
            case DEVICES_MAP.get(DEVICE_KEYS.PATIO_SENSOR).fibaroId :
                this._sensorTriggered(event);
                break;

            case DEVICES_MAP.get(DEVICE_KEYS.MAIN_BEDROOM_THERMOSTAT).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.DRESSING_ROOM_THERMOSTAT).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.STUDY_THERMOSTAT).fibaroId :
            case DEVICES_MAP.get(DEVICE_KEYS.BOOT_ROOM_THERMOSTAT).fibaroId :
                this._temperatureChanged(event);
                break;
        }
    }

    private _sensorTriggered(event: EventEntity) {
        if (event.propertyName === 'value' && event.value === '1') {

            const deviceKey = this._findDeviceKey(event.deviceID);
            this._logger.log('[ Event ] ' + deviceKey + ' motion');

            const lastTriggered = this._lastTriggeredMap.get(deviceKey);

            if (!!lastTriggered) {
                if (this._getMinutesSince(lastTriggered) >= 1) {
                    const houseMode = this._settingsService.getHouseMode();
                    this._setLastTriggered(deviceKey);

                    if (houseMode === SettingHouseModeEnum.AWAY) {
                        const deviceName = DEVICES_MAP.get(deviceKey).name;
                        this._telegramService.sendMessage(deviceName + ' triggered.').subscribe();
                    } else {
                        this._logger.log('[ Event ] No Telegram message sent as house mode is \'' + houseMode + '\'');
                    }
                }
            } else {
                this._setLastTriggered(deviceKey);
            }
        }
        this._nestWebsocketGateway.emitFibaroEvent({
            type: FibaroEventType.MOTION_DETECTED,
            data: {
                deviceId: event.deviceID,
                value: event.value
            }
        });
    }

    private _temperatureChanged(event: EventEntity) {
        if (event.propertyName === 'value') {
            const deviceKey = this._findDeviceKey(event.deviceID);
            this._logger.log('[ Event ] ' + deviceKey + ' temperature');
        }
        this._nestWebsocketGateway.emitFibaroEvent({
            type: FibaroEventType.TEMPERATURE_CHANGED,
            data: {
                deviceId: event.deviceID,
                value: event.value
            }
        });
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
