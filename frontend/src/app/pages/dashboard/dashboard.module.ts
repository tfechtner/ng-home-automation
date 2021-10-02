import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbUserModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
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
        NbIconModule,
        NbButtonModule,
        NgxEchartsModule
    ],
    declarations: [
        DashboardComponent,
        RoomSelectorComponent,
        RoomsComponent,
        PlayerComponent,
        TemperaturesComponent
    ]
})
export class DashboardModule {
}
