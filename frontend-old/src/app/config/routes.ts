import { CONFIG } from './main';

import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { RoomComponent } from '../pages/room/room.component';
import { AudioComponent } from '../pages/audio/audio.component';
import { LightingComponent } from '../pages/lighting/lighting.component';
import { PanelComponent } from '../pages/panel/panel.component';
import { FavouritesComponent } from '../pages/favourites/favourites.component';
import { DevicesComponent } from '../pages/devices/devices.component';

export const ROUTES = [

    // Audio
    {
        path: CONFIG.routing.audio,
        component: AudioComponent,
        children: [
            {
                path: ':roomId',
                pathMatch: 'prefix',
                component: RoomComponent,
                children: [
                    {
                        path: 'favourites',
                        pathMatch: 'full',
                        component: FavouritesComponent
                    }
                ]
            }
        ]
    },

    // Lighting
    {
        path: CONFIG.routing.lighting,
        component: LightingComponent,
        data: {},
        resolve: {},
    },

    // CCTV
    {
        path: CONFIG.routing.cctv,
        component: PanelComponent,
        data: {},
        resolve: {},
    },

    // Room
    {
        path: CONFIG.routing.room + '/:' + CONFIG.routing.room.paramRoomId,
        component: RoomComponent,
        data: {},
        resolve: {},
    },

    // Devices
    {
        path: CONFIG.routing.devices,
        component: DevicesComponent,
        data: {},
        resolve: {},
    },

    // 404 page
    {
        path: CONFIG.routing.pageNotFound,
        component: PageNotFoundComponent,
        data: {}
    },

    // Home
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: ':urlName',
                pathMatch: 'full',
                component: AudioComponent
            }
        ]
    },

    // Page not found action
    {
        path: '**',
        redirectTo: '/404',
    },
];
