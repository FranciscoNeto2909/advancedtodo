
import { io } from 'socket.io-client';
import { serverUrl } from './assets/api';

export const socket = io(serverUrl, {
    transports: ["websocket"],
  });

export const socket_types = {
  message:"message",
  user:"set_username",
  login:"login",
  task:"task"
}