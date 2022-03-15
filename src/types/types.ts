export enum RoomType  {
    human = "human",
    cpu = "cpu"
}

export type Room = {
    id: string,
    name: string,
    owner: string;
    type: RoomType
}