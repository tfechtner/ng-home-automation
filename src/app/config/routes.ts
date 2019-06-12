import { CONFIG } from './main';

import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { RoomComponent } from '../pages/room/room.component';
import { AudioComponent } from '../pages/audio/audio.component';
import { LightingComponent } from '../pages/lighting/lighting.component';
import { PanelComponent } from '../pages/panel/panel.component';

export const ROUTES = [

    // Audio
    {
        path: CONFIG.routing.audio,
        component: AudioComponent,
        children: [
            {
                path: ':urlName',
                pathMatch: 'full',
                component: RoomComponent
            }
        ]
    },

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

    // 404 page
    {
        path: CONFIG.routing.pageNotFound,
        component: PageNotFoundComponent,
        data: {
        }
    },

    // Page not found action
    {
        path: '**',
        redirectTo: '/404',
    },
];
