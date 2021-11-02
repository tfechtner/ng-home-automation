import { Component, OnInit } from '@angular/core';
import { ISonosDeviceDto } from '@backend/devices/models/device';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeviceState } from '../../@state/device/device.state';

@Component({
    selector: 'ngx-speakers',
    templateUrl: './speakers.component.html',
    styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

    @Select(DeviceState.speakers)
    public speakers$: Observable<ISonosDeviceDto[]>;

    constructor() {
    }

    ngOnInit() {
    }
}
