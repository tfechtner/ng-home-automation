import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbMenuModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { NestService } from '@services/nest/nest.service';
import { NestWebsocketService } from '@services/websocket/nest-websocket.service';
import { CoreModule } from './@core/core.module';
import { appState, appStateOptions } from './@state';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NbToastrModule.forRoot(),
        CoreModule.forRoot(),
        ThemeModule.forRoot(),
        NgxsModule.forRoot(appState, appStateOptions),
        NgxsReduxDevtoolsPluginModule.forRoot()
    ],
    providers: [
        NestService,
        NestWebsocketService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
