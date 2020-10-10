import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';
import { SettingHouseMode } from './settings.model';

@Injectable()
export class SettingsService {

    private _settings: SettingsEntity[] = [];

    constructor(
        @InjectRepository(SettingsEntity)
        private _settingsRepository: Repository<SettingsEntity>
    ) {
        this.findAll().then(settings => {
            this._settings = settings;
        }).then(() => {
            console.log('[ SettingsService ] House Mode:', this.getHouseMode());
        });
    }

    async findAll(): Promise<SettingsEntity[]> {
        return await this._settingsRepository.find();
    }

    async findByKey(settingKey: string): Promise<SettingsEntity[]> {
        return await this._settingsRepository.find({
            where: {
                key: settingKey
            }
        });
    }

    async save(setting: SettingsEntity): Promise<SettingsEntity> {
        return await this._settingsRepository.save(setting);
    }

    public getHouseMode(): any {
        const value = this._settings.find(setting => setting.key === 'houseMode').value;
        return SettingHouseMode[value];
    }

    public setHouseMode(mode: SettingHouseMode) {
        const newSetting: SettingsEntity = {
            key: 'houseMode',
            value: SettingHouseMode[mode]
        };
        return this.save(newSetting).then((savedSetting: SettingsEntity) => {
            const settingIndex = this._settings.findIndex(setting => setting.key === 'houseMode');
            this._settings[settingIndex] = savedSetting;
            console.log('[ SettingsService ] House Mode Set To:', this.getHouseMode());
            return savedSetting;
        });
    }
}
