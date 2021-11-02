export interface ISonosTrackDto {
    artist: string;
    title: string;
    album?: string;
    albumArtUri?: string;
    duration: number;
    uri: string;
    trackUri?: string;
    type?: string;
    stationName?: string;
    absoluteAlbumArtUri?: string;
}
