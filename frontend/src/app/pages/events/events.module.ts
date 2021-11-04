import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { EventsComponent } from './events.component';

@NgModule({
    imports: [
        NbCardModule,
        ThemeModule
    ],
    declarations: [
        EventsComponent
    ]
})
export class EventsModule {
}
