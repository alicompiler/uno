import type React from 'react';
import { useGamePlay } from '../../Domain/GamePlay/UseGamePlay';
import { GameNotStarted } from './GameNotStarted';

export const GamePlayContainer: React.FC = () => {
    const gamePlay = useGamePlay();

    if (!gamePlay.gameState) {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-8">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full flex-col gap-8">
            {gamePlay.gameState?.hasStarted ? <h1>TODO: GamePlay UI</h1> : <GameNotStarted />}
            {/* <p>Connection Status: {connectionStatus}</p> */}
            {/* {gameStatus?.hasStarted ? (
                <>
                    <Table players={gameStatus?.players ?? []} meId="ali" activePlayer={6} direction="rtl" />
                    <div>
                        <HandOfCards />
                        <div className="flex items-center justify-center gap-4">
                            <p className="text-md text-center">Cards Count = 9</p>
                            <button className="p-2 border-1 border-indigo-500 rounded text-sm cursor-pointer">
                                Sort By Color
                            </button>
                            <button className="p-2 border-1 border-indigo-500 rounded text-sm cursor-pointer">
                                Sort By Value
                            </button>
                            <button className="p-2 border-1 border-indigo-500 rounded text-sm cursor-pointer">
                                Randomize
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <GameNotStarted gameStatus={gameStatus} />
            )} */}
        </div>
    );
};
