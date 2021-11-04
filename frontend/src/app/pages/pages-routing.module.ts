import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'events',
            component: EventsComponent
        },
        {
            path: 'settings',
            component: SettingsComponent
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        },
        {
            path: '**',
            component: NotFoundComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
