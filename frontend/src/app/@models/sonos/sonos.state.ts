export enum SonosPlayerStateEnum {
    PLAYING = 'PLAYING',
    STOPPED = 'STOPPED',
    PAUSED_PLAYBACK = 'PAUSED_PLAYBACK'
}

export const SonosPlayerStateName = new Map<string, string>([
    [ SonosPlayerStateEnum.PLAYING, 'Playing' ],
    [ SonosPlayerStateEnum.STOPPED, 'Stopped' ],
    [ SonosPlayerStateEnum.PAUSED_PLAYBACK, 'Paused' ]
]);
