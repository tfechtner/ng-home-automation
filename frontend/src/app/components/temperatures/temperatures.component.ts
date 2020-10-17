import { Component, OnInit } from '@angular/core';
import { DEVICE_KEYS, DEVICES_MAP } from '@backend/config/main';

@Component({
    selector: 'ngx-temperatures',
    templateUrl: './temperatures.component.html',
    styleUrls: ['./temperatures.component.scss']
})
export class TemperaturesComponent implements OnInit {

    private devices = DEVICES_MAP;
    private thermostats = [];

    constructor() {
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
