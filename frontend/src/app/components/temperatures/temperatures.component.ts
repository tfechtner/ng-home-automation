import { Component, OnInit } from '@angular/core';
import { DeviceTypes } from '@backend/devices/models/device';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeviceState } from '../../@state/device/device.state';

@Component({
    selector: 'ngx-temperatures',
    templateUrl: './temperatures.component.html',
    styleUrls: ['./temperatures.component.scss']
})
export class TemperaturesComponent implements OnInit {

    @Select(DeviceState.thermostats)
    public thermostats$: Observable<DeviceTypes[]>;

    constructor() {

    }

    ngOnInit() {

    }

    public getTempStatus(value: string): string {
        const temp = +value;
        if (temp > 21) {
            return 'danger';
        } else if (temp >= 18 && temp <= 21) {
            return 'warning';
        } else {
            return 'info';
        }
    }

    // TODO: And mould component!

}
