import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingDto } from './dto/setting.dto';
import { SettingHouseModeEnum } from './enums/settingHouseModes.enum';
import { SettingsEntity } from './settings.entity';

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

    // Repo

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

    async save(setting: SettingDto): Promise<SettingsEntity> {
        return await this._settingsRepository.save(setting);
    }

    // Internal

    public getHouseMode(): any {
        const value = this._settings.find(setting => setting.key === 'houseMode').value;
        return SettingHouseModeEnum[value];
    }

    public setHouseMode(mode: SettingHouseModeEnum) {
        const newSetting: SettingDto = {
            key: 'houseMode',
            value: SettingHouseModeEnum[mode]
        };
        return this.save(newSetting).then((savedSetting: SettingsEntity) => {
            const settingIndex = this._settings.findIndex(setting => setting.key === 'houseMode');
            this._settings[settingIndex] = savedSetting;
            console.log('[ SettingsService ] House Mode Set To:', savedSetting.value);
            return savedSetting;
        });
    }
}
