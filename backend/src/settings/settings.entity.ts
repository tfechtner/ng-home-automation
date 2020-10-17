import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SettingKeysEnum } from './enums/settingKeys.enum';

@Entity()
export class SettingsEntity {

    @PrimaryColumn()
    key: SettingKeysEnum;

    @Column({
        default: null
    })
    value: string;
}
