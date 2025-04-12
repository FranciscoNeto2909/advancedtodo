
import { io } from 'socket.io-client';
import { serverUrl } from './assets/api';

export const socket = io(serverUrl, {
    transports: ["websocket"],
  });