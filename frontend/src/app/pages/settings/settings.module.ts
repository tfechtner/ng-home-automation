import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ThemeComponent } from '../../components/theme/theme.component';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [
        NbButtonModule,
        NbCardModule,
        NbIconModule,
        ThemeModule
    ],
    declarations: [
        SettingsComponent,
        ThemeComponent
    ]
})
export class SettingsModule {
}
