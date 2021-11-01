import { Component, OnInit } from '@angular/core';
import { IFibaroDeviceDto } from '@backend/devices/models/device';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeviceState } from '../../@state/device/device.state';

@Component({
    selector: 'ngx-batteries',
    templateUrl: './batteries.component.html',
    styleUrls: ['./batteries.component.scss']
})
export class BatteriesComponent implements OnInit {

    @Select(DeviceState.batteries)
    public batteries$: Observable<IFibaroDeviceDto[]>;

    constructor() {
    }

    ngOnInit() {
    }

    public getBatteryStatus(level: number): string {
        if (level < 20) {
            return 'danger';
        } else if (level >= 21 && level <= 50) {
            return 'warning';
        } else {
            return 'success';
        }
    }
}
