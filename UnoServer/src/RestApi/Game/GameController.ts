import { ExpressInstance } from '../../../server';
import { getServiceProvider } from '../../Core/ServiceProvider';
import { Request, Response } from 'express';
import Joi from 'joi';
import { createGame, GameType, gameTypeValues } from '../../Domain/Game/Factory/GameFactory';
import { DuplicateGameErrorCode } from '../../Domain/Errors/ErrorCodes';

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

    game.players.push({
        id: payload.creator.id,
        name: payload.creator.name,
        cards: [],
        isAdmin: true,
    });

    try {
        const createdGame = gamesRepository.addGame(game);
        res.status(201).json(createdGame);
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith(DuplicateGameErrorCode)) {
                res.status(409).json({ message: 'Game already exists' });
            }
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

interface JoinGamePayload {
    userId: string;
    name: string;
    gameId: string;
}
const joinGameSchema = Joi.object<JoinGamePayload>({
    userId: Joi.string().uuid().required(),
    gameId: Joi.string().uuid().required(),
    name: Joi.string().min(1).required(),
});

const joinGameApi = (req: Request, res: Response) => {
    const { error, value: payload } = joinGameSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((d) => d.message),
        });
    }

    const game = gamesRepository.findById(payload.gameId);
    if (!game) {
        return res.status(404).json({
            message: 'cannot find game',
        });
    }

    if (game.players.some((p) => p.id === payload.userId)) {
        return res.status(409).json({
            message: 'already joined',
        });
    }

    const MAX_PLAYERS_COUNT = 10;
    if (game.players.length === MAX_PLAYERS_COUNT) {
        return res.status(403).json({
            message: 'game is full',
        });
    }

    game.players.push({
        id: payload.userId,
        name: payload.name,
        cards: [],
        isAdmin: false,
    });

    res.status(201).send();
};

export const addGamesApi = (restApi: ExpressInstance) => {
    restApi.post('/api/games', createGameApi);
    restApi.post('/api/games/:gameId/players', joinGameApi);
    // TODO: remove
    restApi.get('/api/games', (_, res) => {
        res.status(200).json(
            gamesRepository.getAll().map((g) => {
                g.discardPile = [];
                g.withdrawPile = [];
                return g;
            })
        );
    });
};
