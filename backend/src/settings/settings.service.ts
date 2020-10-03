import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './settings.entity';

@Injectable()
export class SettingsService {

    constructor(
        @InjectRepository(SettingsEntity)
        private _settingsRepository: Repository<SettingsEntity>
    ) {}

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
}
