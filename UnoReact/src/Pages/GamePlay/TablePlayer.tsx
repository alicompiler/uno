import type { GameStatus } from '../../Domain/Message/Incoming/GameStatusMessagePayload';

export const TablePlayer: React.FC<{ player: GameStatus['players'][number]; isActive: boolean }> = ({
    player,
    isActive,
}) => {
    let bg = 'bg-amber-200 text-black';
    if (isActive) {
        bg = 'bg-green-200 text-black';
    }
    if (player.isConnected === false) {
        bg = 'bg-red-200 text-black';
    }

    return (
        <div className={`p-2 rounded shadow-2xl ${bg}`}>
            <p className="text-sm w-16 max-w-16 overflow-ellipsis text-center text-nowrap overflow-hidden">
                {player.name}
            </p>
            {player.isConnected === false ? <p className="text-xs">[Disconnected]</p> : null}
            {player.isConnected && player.cardsCountIndicator === 'low' ? <p className="text-xs">(Low Cards)</p> : null}
        </div>
    );
};
