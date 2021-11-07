import { Component, OnInit } from '@angular/core';
import { ICameraDeviceDto } from '@backend/devices/models/device';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeviceState } from '../../@state/device/device.state';

@Component({
    selector: 'ngx-cameras',
    templateUrl: './cameras.component.html',
    styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

    @Select(DeviceState.cameras)
    public cameras$: Observable<ICameraDeviceDto[]>;

    constructor() {
    }

    ngOnInit() {
    }
}
