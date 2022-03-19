export type RoomType = 'human' | 'cpu';

export type GamePlayState = 'wait' | 'play';

export type Room = {
  id: string;
  name: string;
  owner: string;
  type: RoomType;
};

export type User = {
  id: string;
  name: string;
  room: string;
};

export type GameOperation = -1 | 0 | 1;

export type GameResult = 'win' | 'lose';

export type GameMove = {
  username: string;
  number: number;
  selectedNumber: GameOperation;
  result: number;
  isCorrectResult: boolean;
};
