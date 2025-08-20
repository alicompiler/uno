import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // import cors
import { addGamesApi } from './src/RestApi/Game/GameController';

export type ExpressInstance = ReturnType<typeof express>;
const restApi = express();

restApi.use(cors());
restApi.use(bodyParser.json());

restApi.get('/health', (_, res) => res.status(200).send('OK'));
addGamesApi(restApi);

restApi.listen(3000, () => {
    console.log('RestApi available on port 3000');
});
