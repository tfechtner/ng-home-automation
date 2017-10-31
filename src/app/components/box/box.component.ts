import { Component, OnInit } from '@angular/core';

import { SonosService } from '../../services/sonos.service';

@Component({
    selector: 'app-box',
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {

    constructor(private sonosService: SonosService) {
    }

    ngOnInit() {
        this.sonosService.getZones().subscribe(
            data => {
                console.log('data', data);
            },
            (error) => {
                console.log(error);
            }
        );
    }

}
