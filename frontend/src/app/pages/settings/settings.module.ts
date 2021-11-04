import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ThemeComponent } from '../../components/theme/theme.component';
import { UpdateComponent } from '../../components/update/update.component';
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
        ThemeComponent,
        UpdateComponent
    ]
})
export class SettingsModule {
}
