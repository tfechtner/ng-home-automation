import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FibaroState } from '../../store/state/fibaro/fibaro.state';
import { IFibaroDevices } from '../../../../../backend/src/fibaro/interfaces';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

    @Select(FibaroState.devices)
    public fibaroDevices$: Observable<IFibaroDevices>;

    public displayedColumns: string[] = ['id', 'name', 'type', 'enabled', 'visible', 'dead', 'roomID'];

    constructor() {
    }

    ngOnInit() {
    }

}
