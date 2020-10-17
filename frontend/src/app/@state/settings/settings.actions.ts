import { SettingHouseModeEnum } from '@backend/settings/enums/settingHouseModes.enum';

const key = '[ Settings ]';

export namespace SettingsActions {

    export class GetSettings {
        public static readonly type: string = `${key} Get`;
    }

    export class SetHouseMode {
        public static readonly type: string = `${key} Set`;
        constructor(public payload: { houseMode: SettingHouseModeEnum }) { }
    }
}
