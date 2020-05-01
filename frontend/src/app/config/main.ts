import { environment } from '../../environments/environment';

const config = {
    API: {
        baseUrl: '',
        nest: environment.api
    },
    routing : {
        base: '',
        audio: 'audio',
        lighting: 'lighting',
        cctv: 'cctv',
        devices: 'devices',
        room: {
            url: 'room',
            paramRoomId: 'roomId'
        },
        pageNotFound: '404'
    },
    rooms: {
        lounge: {
            name: 'Lounge',
            sonosRoomName: 'Lounge',
            icon: 'fa-tv'
        },
        bedroom: {
            name: 'Bedroom',
            sonosRoomName: 'Bedroom',
            icon: 'fa-bed'
        }
    }
};

export const CONFIG = config;
