import { SettingKeysEnum } from '../enums/settingKeys.enum';

export interface SettingDto {
    key: SettingKeysEnum;
    value: string;
}
