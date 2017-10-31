import { environment } from '../../environments/environment';
import { isNullOrUndefined } from 'util';

export const ENV_PRODUCTION = 'production';
export const ENV_DEVELOPMENT = 'develop';

let SERVER_ENV = null,
    SERVER_API_BASE = null;

// if (isNullOrUndefined(process) === false && isNullOrUndefined(process.env) === false) {
//     if (isNullOrUndefined(process.env.NODE_ENV) === false) {
//         SERVER_ENV = process.env.NODE_ENV;
//     }
//     if (isNullOrUndefined(process.env.SERVER_API_BASE) === false) {
//         SERVER_API_BASE = process.env.SERVER_API_BASE;
//     }
// }

function environmentIsLive(env) {
    if ((env in environment && environment[env] === true) || SERVER_ENV === env) {
        return true;
    }
    return false;
}

let config = {
    APP_BASE_HREF: '/shop',
    APP_BASE_ASSETS: '',
    API: {
        baseUrl: '',
        sonos: 'http://localhost:5005/'
    },
    routing : {
        base: '',
        pageNotFound: '404'
    }
};


if (environmentIsLive(ENV_PRODUCTION) === true) {
    config.API.baseUrl = 'https://www.XXXX.com/api';
    config.routing.base = '';
    config.APP_BASE_ASSETS = '/shop';
}

if (environmentIsLive(ENV_DEVELOPMENT) === true) {
    console.info('Backend ENV: DEVELOP');
    config.API.baseUrl = 'http://localhost:82';
}

export const CONFIG = config;
