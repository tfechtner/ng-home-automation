import { Component, OnInit } from '@angular/core';
import { CheckForUpdateService } from '@services/update/update.service';
import packageJson from '../../../../package.json';

@Component({
    selector: 'ngx-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

    public version = packageJson.version;
    public isServiceWorkerEnabled: boolean = null;

    constructor(
        private _checkForUpdateService: CheckForUpdateService
    ) {}

    ngOnInit(): void {
        this.isServiceWorkerEnabled = this._checkForUpdateService.isServiceWorkerEnabled()
    }

    onClickReload() {
        this._checkForUpdateService.reload();
    }

}
