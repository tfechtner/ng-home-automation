import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { MatTableModule } from '@angular/material/table';

import { ROUTES } from './config/routes';

import { appState } from './store/state';

import { PageService } from './services/page/page.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BoxComponent } from './components/box/box.component';

import { RoomComponent } from './pages/room/room.component';
import { AudioComponent } from './pages/audio/audio.component';
import { LightingComponent } from './pages/lighting/lighting.component';
import { PanelComponent } from './pages/panel/panel.component';
import { NestService } from './services/nest/nest.service';
import { environment } from '../environments/environment';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        SideNavComponent,
        TopNavComponent,
        BoxComponent,
        RoomComponent,
        AudioComponent,
        LightingComponent,
        PanelComponent,
        FavouritesComponent,
        DevicesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatTableModule,
        RouterModule.forRoot(ROUTES),
        NgxsModule.forRoot(appState, { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NoopAnimationsModule
    ],
    providers: [
        PageService,
        NestService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
