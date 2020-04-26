import { Component } from '@angular/core';

@Component({
    selector: 'ngx-footer',
    styleUrls: ['./footer.component.scss'],
    template: `
<span class="created-by">
    Created with ♥ by <b>IckleTom</b> 2020
</span>
<div class="socials">
    <a href="#" target="_blank" class="ion ion-social-github"></a>
</div>
    `,
})
export class FooterComponent {
}
