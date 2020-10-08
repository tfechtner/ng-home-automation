import { Component } from '@angular/core';
import * as packageJson from '../../../../../package.json';

@Component({
    selector: 'ngx-footer',
    styleUrls: ['./footer.component.scss'],
    template: `
<span class="created-by">
    Created with ♥ by <b>IckleTom</b> 2020
</span>
<div>
    <!--<a href="#" target="_blank" class="ion ion-social-github"></a>-->
    v{{ version }}
</div>
    `
})
export class FooterComponent {
    public version = packageJson['version'];
}
