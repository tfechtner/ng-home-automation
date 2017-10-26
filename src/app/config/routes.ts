import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

import { CONFIG } from './main';

export const ROUTES = [

    {
        path: '',
        component: HomeComponent,
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
