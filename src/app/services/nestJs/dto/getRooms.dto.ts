export interface GetRoomDto {
    _id: number;
    _name: string;
    _sonosKey: string;
}

export interface GetRoomsDto extends Array<GetRoomDto> {}
