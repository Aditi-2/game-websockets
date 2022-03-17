import io from 'socket.io-client';
import { WS_API } from './env';

export const socket = io(WS_API ?? '');


export const createListeners = () => {
  socket.on('message', (args: any) => {
    console.log(args);
  });
};

export const connnection = () => {
    socket.connect()
    socket.on('connect', () => {
        socket.send('connection');
    })
};

export const login = (username: string) => {
  socket.emit('login', {username});
};

export {};
