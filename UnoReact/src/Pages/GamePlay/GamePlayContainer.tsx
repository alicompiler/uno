import type React from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { GameNotStarted } from './GameNotStarted';
import { GameStarted } from './GameStarted';
import { useWebsocket } from '../../Domain/Websocket/UseWebsocket';

export const GamePlayContainer: React.FC = () => {
    const gamePlay = useGamePlay();
    const ws = useWebsocket();

    if (!gamePlay.gameState && ws.connectionStatus === 'connecting') {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-8">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    if (!gamePlay.gameState && ws.connectionStatus === 'disconnected') {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-8">
                <p className="text-lg">Cannot Connect</p>
                <p className="text-lg">It could be the game ended or something wrong with your connection</p>
            </div>
        );
    }

    if (!gamePlay.gameState && ws.connectionStatus === 'connected') {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-8">
                <p className="text-lg">Game Not Loaded Yet</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full flex-col gap-8 w-full">
            {gamePlay.gameState?.hasStarted ? <GameStarted /> : <GameNotStarted />}
        </div>
    );
};
