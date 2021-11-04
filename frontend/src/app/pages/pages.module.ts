import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { EventsModule } from './events/events.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        EventsModule,
        SettingsModule,
        NbCardModule,
        NbMenuModule
    ],
    declarations: [
        NotFoundComponent,
        PagesComponent
    ]
})
export class PagesModule {
}
