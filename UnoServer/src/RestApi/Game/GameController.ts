import { ExpressInstance } from '../../../server';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { Request, Response } from 'express';
import Joi from 'joi';
import { createGame, GameType, gameTypeValues } from '../../Domain/Game/GameFactory';
import { DuplicateGameErrorCode } from '../../Domain/Game/GameRepository';

const serviceProvider = getServiceProvider();
const gamesRepository = serviceProvider.getGameRepository();

interface CreateGamePayload {
    type: GameType;
    creator: {
        id: string;
        name: string;
    };
}

const createGameSchema = Joi.object<CreateGamePayload>({
    type: Joi.string()
        .valid(...gameTypeValues)
        .required(),
    creator: Joi.object({
        id: Joi.string().uuid().required(),
        name: Joi.string().min(1).required(),
    }).required(),
});

const createGameApi = (req: Request, res: Response) => {
    const { error, value } = createGameSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((d) => d.message),
        });
    }

    const payload = value as CreateGamePayload;
    const game = createGame(payload.type);

    try {
        const createdGame = gamesRepository.addGame(game);
        res.status(201).json(createdGame);
    } catch (e: any) {
        if (e.message.startsWith(DuplicateGameErrorCode)) {
            res.status(409).json({ message: 'Game already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const addGamesApi = (restApi: ExpressInstance) => {
    restApi.post('/api/games', createGameApi);
};
