import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ROUTES } from './config/routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BoxComponent } from './components/box/box.component';

import { PageService } from './services/page/page.service';
import { SonosService } from './services/sonos/sonos.service';

import { RoomComponent } from './pages/room/room.component';
import { AudioComponent } from './pages/audio/audio.component';
import { LightingComponent } from './pages/lighting/lighting.component';
import { PanelComponent } from './pages/panel/panel.component';

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
        PanelComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(ROUTES),
    ],
    providers: [
        PageService,
        SonosService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
