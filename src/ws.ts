import io from 'socket.io-client';
import { WS_API } from './env';

type JoinRoomPayload = { username: string; room: string; roomType: string };

export const socket = io(WS_API ?? '');

export const connnection = () => {
  socket.connect();
  socket.on('connect', () => {
    socket.send('connection');
  });
};

export const disconnect = () => {
  socket.disconnect()
}

export const login = (username: string) => {
  socket.emit('login', { username });
};

export const joinRoom = (payload: JoinRoomPayload) => {
  socket.emit('joinRoom', payload);
};

export const letsPlay = () => {
  socket.emit('letsPlay');
};

export const leaveRoom = () => {
  socket.emit('leaveRoom');
};