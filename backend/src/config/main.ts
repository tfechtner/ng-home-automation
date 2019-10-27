const rooms = [
    {
        id: 0,
        name: 'Lounge',
        urlName: 'lounge',
        sonosKey: 'lounge'
    },
    {
        id: 1,
        name: 'Bedroom',
        urlName: 'bedroom',
        sonosKey: 'bedroom'
    }
];

const config = {
    APP_BASE_HREF: '/shop',
    APP_BASE_ASSETS: '',
    API: {
        baseUrl: '',
        sonos: 'http://localhost:5005/',
        fibaro: 'http://192.168.1.33/api/'
    },
    ROOMS: rooms
};

export const CONFIG = config;
