import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SettingsEntity } from './settings.entity';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(
        private readonly _settingsService: SettingsService
    ) {}

    @Get()
    index(): Promise<SettingsEntity[]> {
        return this._settingsService.findAll();
    }

    @Get(':key')
    getSetting(
        @Param('key') key: string
    ): Promise<SettingsEntity[]> {
        return this._settingsService.findByKey(key);
    }

    @Post('save')
    async save(@Body() settingsData: SettingsEntity): Promise<SettingsEntity> {
        return this._settingsService.save(settingsData);
    }
}
