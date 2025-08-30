import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addGamesApi } from './src/RestApi/Game/GameController';
import { WebSocketServer } from 'ws';
import { createWebSocketConnectionHandler } from './src/WebSocket/WebSocketConnectionHandler';

export type ExpressInstance = ReturnType<typeof express>;
const restApi = express();

restApi.use(cors());
restApi.use(bodyParser.json());

restApi.get('/health', (_, res) => res.status(200).send('OK'));
addGamesApi(restApi);

const wss = new WebSocketServer({
    port: 4001,
});

wss.on('connection', (ws, req) => createWebSocketConnectionHandler(ws, req));

restApi.listen(4000);
