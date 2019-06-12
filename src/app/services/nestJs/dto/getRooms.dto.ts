export interface GetRoomDto {
    id: number;
    name: string;
    sonosKey: string;
}

export interface GetRoomsDto extends Array<GetRoomDto> {}
