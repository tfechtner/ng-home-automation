import { CONFIG } from './main';

import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { RoomComponent } from '../pages/room/room.component';
import { AudioComponent } from '../pages/audio/audio.component';

export const ROUTES = [

    {
        path: '',
        component: HomeComponent,
        data: {},
        resolve: {},
    },

    // Audio
    {
        path: CONFIG.routing.audio,
        component: AudioComponent,
        data: {},
        resolve: {},
    },

    // Room
    {
        path: CONFIG.routing.room.url + '/:' + CONFIG.routing.room.paramRoomId,
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
