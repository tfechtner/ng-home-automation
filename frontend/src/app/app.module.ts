import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbMenuModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';
import { NestService } from './services/nest/nest.service';
import { NestWebsocketService } from './services/websocket/nest-websocket.service';

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
        ThemeModule.forRoot()
    ],
    providers: [
        NestService,
        NestWebsocketService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
