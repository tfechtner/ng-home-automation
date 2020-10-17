import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SettingDto } from './dto/setting.dto';
import { SettingHouseModeEnum } from './enums/settingHouseModes.enum';
import { SettingsEntity } from './settings.entity';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly _settingsService: SettingsService
    ) {}

    @Get()
    async index(): Promise<SettingDto[]> {
        return this._settingsService.findAll();
    }

    @Get(':key')
    async getSetting(
        @Param('key') key: string
    ): Promise<SettingDto[]> {
        return this._settingsService.findByKey(key);
    }

    @Post('save')
    async save(@Body() settingsData: SettingsEntity): Promise<SettingDto> {
        return this._settingsService.save(settingsData);
    }

    @Get('set-house-mode/:mode')
    async setHouseMode(
        @Param('mode') mode: SettingHouseModeEnum
    ): Promise<SettingDto> {
        return this._settingsService.setHouseMode(mode);
    }
}
