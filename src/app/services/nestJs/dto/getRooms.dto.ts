export interface GetRoomDto {
    id: number;
    name: string;
    urlName: string;
    sonosKey: string;
}

export interface GetRoomsDto extends Array<GetRoomDto> {}
