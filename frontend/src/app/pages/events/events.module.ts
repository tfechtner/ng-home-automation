import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { EventsComponent } from './events.component';

@NgModule({
    imports: [
        NbCardModule
    ],
    declarations: [
        EventsComponent
    ]
})
export class EventsModule {
}
