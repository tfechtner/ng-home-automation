import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DEVICE_KEYS, DEVICES_MAP } from '../../../../../backend/src/config/main';

@Component({
    selector: 'ngx-temperatures',
    templateUrl: './temperatures.component.html',
    styleUrls: ['./temperatures.component.scss']
})
export class TemperaturesComponent implements OnInit {

    private devices = DEVICES_MAP;
    private thermostats = [];

    constructor(
        private _store: Store
    ) {
        this.thermostats = [
            this.devices.get(DEVICE_KEYS.MAIN_BEDROOM_THERMOSTAT),
            this.devices.get(DEVICE_KEYS.DRESSING_ROOM_THERMOSTAT),
            this.devices.get(DEVICE_KEYS.STUDY_THERMOSTAT),
            this.devices.get(DEVICE_KEYS.BOOT_ROOM_THERMOSTAT)
        ];
    }

    ngOnInit() {

    }

}
