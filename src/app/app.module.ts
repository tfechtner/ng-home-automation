import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ROUTES } from './config/routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BoxComponent } from './components/box/box.component';

import { SonosService } from './services/sonos.service';
import { RoomComponent } from './pages/room/room.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        SideNavComponent,
        TopNavComponent,
        BoxComponent,
        RoomComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(ROUTES),
    ],
    providers: [SonosService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
