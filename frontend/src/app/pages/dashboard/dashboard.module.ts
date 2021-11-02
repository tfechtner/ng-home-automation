import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { BatteriesComponent } from '../../components/batteries/batteries.component';
import { SpeakersComponent } from '../../components/speakers/speakers.component';
import { TemperaturesComponent } from '../../components/temperatures/temperatures.component';
import { DashboardComponent } from './dashboard.component';
import { PlayerComponent } from './rooms/player/player.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule
    ],
    declarations: [
        DashboardComponent,
        RoomSelectorComponent,
        RoomsComponent,
        PlayerComponent,
        TemperaturesComponent,
        BatteriesComponent,
        SpeakersComponent
    ]
})
export class DashboardModule {
}
