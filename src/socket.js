
import { io } from 'socket.io-client';
import { serverUrl } from './assets/api';

const URL = serverUrl;

export const socket = io.connect(URL);