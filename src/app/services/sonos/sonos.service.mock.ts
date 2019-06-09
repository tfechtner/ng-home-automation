import { Observable, of } from 'rxjs';

export class SonosServiceMock {

    constructor() {
    }

    public getZones(): Observable<object> {
        return of(mockZoneData);
    }

    public getState(): Observable<any> {
        return of(mockStateData);
    }

    public getRoomState(): Observable<any> {
        return of(mockRoomStateData);
    }
}

export const mockZoneData: object = [
    {
        'uuid': 'RINCON_000E5835A92801400',
        'coordinator': {
            'uuid': 'RINCON_000E5835A92801400',
            'state': {
                'volume': 43,
                'mute': false,
                'equalizer': {
                    'bass': 0,
                    'treble': 0,
                    'loudness': true
                },
                'currentTrack': {
                    'artist': 'Heart UK',
                    'title': 'x-sonosapi-stream:s241397?sid=254&flags=8224&sn=0',
                    'albumArtUri': '/getaa?s=1&u=x-sonosapi-stream%3as241397%3fsid%3d254%26flags%3d8224%26sn%3d0',
                    'duration': 0,
                    'uri': 'x-sonosapi-stream:s241397?sid=254&flags=8224&sn=0',
                    'type': 'radio',
                    'stationName': 'Heart UK',
                    'absoluteAlbumArtUri': 'http://192.168.0.9:1400/getaa?s=1&u=x-sonosapi-stream%3as241397%3fsid%3d254%26flags%3d8224%26sn%3d0'
                },
                'nextTrack': {
                    'artist': '',
                    'title': '',
                    'album': '',
                    'albumArtUri': '',
                    'duration': 0,
                    'uri': ''
                },
                'trackNo': 1,
                'elapsedTime': 0,
                'elapsedTimeFormatted': '00:00:00',
                'playbackState': 'STOPPED',
                'playMode': {
                    'repeat': 'none',
                    'shuffle': false,
                    'crossfade': false
                }
            },
            'roomName': 'Bathroom',
            'coordinator': 'RINCON_000E5835A92801400',
            'groupState': {
                'volume': 43,
                'mute': false
            }
        },
        'members': [
            {
                'uuid': 'RINCON_000E5835A92801400',
                'state': {
                    'volume': 43,
                    'mute': false,
                    'equalizer': {
                        'bass': 0,
                        'treble': 0,
                        'loudness': true
                    },
                    'currentTrack': {
                        'artist': 'Heart UK',
                        'title': 'x-sonosapi-stream:s241397?sid=254&flags=8224&sn=0',
                        'albumArtUri': '/getaa?s=1&u=x-sonosapi-stream%3as241397%3fsid%3d254%26flags%3d8224%26sn%3d0',
                        'duration': 0,
                        'uri': 'x-sonosapi-stream:s241397?sid=254&flags=8224&sn=0',
                        'type': 'radio',
                        'stationName': 'Heart UK',
                        'absoluteAlbumArtUri': 'http://192.168.0.9:1400/getaa?s=1&u=x-sonosapi-stream%3as241397%3fsid%3d254%26flags%3d8224%26sn%3d0'
                    },
                    'nextTrack': {
                        'artist': '',
                        'title': '',
                        'album': '',
                        'albumArtUri': '',
                        'duration': 0,
                        'uri': ''
                    },
                    'trackNo': 1,
                    'elapsedTime': 0,
                    'elapsedTimeFormatted': '00:00:00',
                    'playbackState': 'STOPPED',
                    'playMode': {
                        'repeat': 'none',
                        'shuffle': false,
                        'crossfade': false
                    }
                },
                'roomName': 'Bathroom',
                'coordinator': 'RINCON_000E5835A92801400',
                'groupState': {
                    'volume': 43,
                    'mute': false
                }
            }
        ]
    },
    {
        'uuid': 'RINCON_000E58C2012E01400',
        'coordinator': {
            'uuid': 'RINCON_000E58C2012E01400',
            'state': {
                'volume': 20,
                'mute': false,
                'equalizer': {
                    'bass': 4,
                    'treble': 7,
                    'loudness': false
                },
                'currentTrack': {
                    'artist': 'cyberalmaVEVO',
                    'title': 'ALMA, French Montana - Phases (Official Video)',
                    'album': 'transfer',
                    'albumArtUri': 'http://192.168.0.14:3500/music/image?id=20265&flags=1',
                    'duration': 206,
                    'uri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20265&flags=1',
                    'type': 'track',
                    'stationName': '',
                    'absoluteAlbumArtUri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20265&flags=1'
                },
                'nextTrack': {
                    'artist': 'Scorpio Music',
                    'title': 'Tyron Hapi Ft. Mimoza - Anyway (Lyric Video)',
                    'album': 'transfer',
                    'albumArtUri': 'http://192.168.0.14:3500/music/image?id=20266&flags=1',
                    'duration': 171,
                    'uri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20266&flags=1',
                    'absoluteAlbumArtUri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20266&flags=1'
                },
                'trackNo': 8,
                'elapsedTime': 72,
                'elapsedTimeFormatted': '00:01:12',
                'playbackState': 'PLAYING',
                'playMode': {
                    'repeat': 'none',
                    'shuffle': false,
                    'crossfade': false
                }
            },
            'roomName': 'Lounge',
            'coordinator': 'RINCON_000E58C2012E01400',
            'groupState': {
                'volume': 20,
                'mute': false
            }
        },
        'members': [
            {
                'uuid': 'RINCON_000E58C2012E01400',
                'state': {
                    'volume': 20,
                    'mute': false,
                    'equalizer': {
                        'bass': 4,
                        'treble': 7,
                        'loudness': false
                    },
                    'currentTrack': {
                        'artist': 'cyberalmaVEVO',
                        'title': 'ALMA, French Montana - Phases (Official Video)',
                        'album': 'transfer',
                        'albumArtUri': 'http://192.168.0.14:3500/music/image?id=20265&flags=1',
                        'duration': 206,
                        'uri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20265&flags=1',
                        'type': 'track',
                        'stationName': '',
                        'absoluteAlbumArtUri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20265&flags=1'
                    },
                    'nextTrack': {
                        'artist': 'Scorpio Music',
                        'title': 'Tyron Hapi Ft. Mimoza - Anyway (Lyric Video)',
                        'album': 'transfer',
                        'albumArtUri': 'http://192.168.0.14:3500/music/image?id=20266&flags=1',
                        'duration': 171,
                        'uri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20266&flags=1',
                        'absoluteAlbumArtUri': 'http://mobile-ACR-ff5f35fc833501b7.x-udn/music/track.mp3?id=20266&flags=1'
                    },
                    'trackNo': 8,
                    'elapsedTime': 72,
                    'elapsedTimeFormatted': '00:01:12',
                    'playbackState': 'PLAYING',
                    'playMode': {
                        'repeat': 'none',
                        'shuffle': false,
                        'crossfade': false
                    }
                },
                'roomName': 'Lounge',
                'coordinator': 'RINCON_000E58C2012E01400',
                'groupState': {
                    'volume': 20,
                    'mute': false
                }
            }
        ]
    },
    {
        'uuid': 'RINCON_5CAAFD4F418601400',
        'coordinator': {
            'uuid': 'RINCON_5CAAFD4F418601400',
            'state': {
                'volume': 34,
                'mute': false,
                'equalizer': {
                    'bass': 0,
                    'treble': 0,
                    'loudness': true
                },
                'currentTrack': {
                    'artist': '',
                    'title': '',
                    'album': '',
                    'albumArtUri': '',
                    'duration': 0,
                    'uri': '',
                    'type': 'track',
                    'stationName': ''
                },
                'nextTrack': {
                    'artist': '',
                    'title': '',
                    'album': '',
                    'albumArtUri': '',
                    'duration': 0,
                    'uri': ''
                },
                'trackNo': 0,
                'elapsedTime': 0,
                'elapsedTimeFormatted': '00:00:00',
                'playbackState': 'STOPPED',
                'playMode': {
                    'repeat': 'none',
                    'shuffle': false,
                    'crossfade': false
                }
            },
            'roomName': 'Bedroom',
            'coordinator': 'RINCON_5CAAFD4F418601400',
            'groupState': {
                'volume': 34,
                'mute': false
            }
        },
        'members': [
            {
                'uuid': 'RINCON_5CAAFD4F418601400',
                'state': {
                    'volume': 34,
                    'mute': false,
                    'equalizer': {
                        'bass': 0,
                        'treble': 0,
                        'loudness': true
                    },
                    'currentTrack': {
                        'artist': '',
                        'title': '',
                        'album': '',
                        'albumArtUri': '',
                        'duration': 0,
                        'uri': '',
                        'type': 'track',
                        'stationName': ''
                    },
                    'nextTrack': {
                        'artist': '',
                        'title': '',
                        'album': '',
                        'albumArtUri': '',
                        'duration': 0,
                        'uri': ''
                    },
                    'trackNo': 0,
                    'elapsedTime': 0,
                    'elapsedTimeFormatted': '00:00:00',
                    'playbackState': 'STOPPED',
                    'playMode': {
                        'repeat': 'none',
                        'shuffle': false,
                        'crossfade': false
                    }
                },
                'roomName': 'Bedroom',
                'coordinator': 'RINCON_5CAAFD4F418601400',
                'groupState': {
                    'volume': 34,
                    'mute': false
                }
            }
        ]
    }
];

export const mockStateData: object = {
    'volume': 20,
    'mute': false,
    'equalizer': {
        'bass': -6,
        'treble': 5,
        'loudness': false
    },
    'currentTrack': {
        'artist': '',
        'title': '',
        'album': '',
        'albumArtUri': '',
        'duration': 0,
        'uri': 'x-rincon-queue:RINCON_000E58C2012E01400#0',
        'type': 'track',
        'stationName': ''
    },
    'nextTrack': {
        'artist': '',
        'title': '',
        'album': '',
        'albumArtUri': '',
        'duration': 0,
        'uri': ''
    },
    'trackNo': 0,
    'elapsedTime': 0,
    'elapsedTimeFormatted': '00:00:00',
    'playbackState': 'STOPPED',
    'playMode': {
        'repeat': 'none',
        'shuffle': false,
        'crossfade': false
    }
};

export const mockRoomStateData: object = {
    'volume': 11,
    'mute': false,
    'equalizer': {
        'bass': 0,
        'treble': 0,
        'loudness': true
    },
    'currentTrack': {
        'artist': 'Lolo Zouaï',
        'title': 'High Highs to Low Lows',
        'album': 'High Highs to Low Lows',
        'albumArtUri': '/getaa?s=1&u=x-sonos-spotify%3aspotify%253atrack%253a1oNcADo4TZHpkfH8x1xRVW%3fsid%3d9%26flags%3d8224%26sn%3d6',
        'duration': 234,
        'uri': 'x-sonos-spotify:spotify%3atrack%3a1oNcADo4TZHpkfH8x1xRVW?sid=9&flags=8224&sn=6',
        'type': 'track',
        'stationName': '',
        'absoluteAlbumArtUri': 'http://192.168.0.2:1400/getaa?s=1&u=x-sonos-spotify%3aspotify%253atrack%253a1oNcADo4TZHpkfH8x1xRVW%3fsid%3d9%26flags%3d8224%26sn%3d6'
    },
    'nextTrack': {
        'artist': 'Kelela',
        'title': 'Better',
        'album': 'Take Me Apart',
        'albumArtUri': '/getaa?s=1&u=x-sonos-spotify%3aspotify%253atrack%253a0ts84OMi1c1ugEv7yRBqX2%3fsid%3d9%26flags%3d8224%26sn%3d6',
        'duration': 266,
        'uri': 'x-sonos-spotify:spotify%3atrack%3a0ts84OMi1c1ugEv7yRBqX2?sid=9&flags=8224&sn=6',
        'absoluteAlbumArtUri': 'http://192.168.0.2:1400/getaa?s=1&u=x-sonos-spotify%3aspotify%253atrack%253a0ts84OMi1c1ugEv7yRBqX2%3fsid%3d9%26flags%3d8224%26sn%3d6'
    },
    'trackNo': 25,
    'elapsedTime': 134,
    'elapsedTimeFormatted': '00:02:14',
    'playbackState': 'PAUSED_PLAYBACK',
    'playMode': {
        'repeat': 'none',
        'shuffle': true,
        'crossfade': false
    }
};
