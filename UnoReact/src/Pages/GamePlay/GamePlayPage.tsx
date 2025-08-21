import { useParams } from 'react-router';
import { GamePlayProvider } from '../../Domain/GamePlay/GamePlayProvider';
import { GamePlayContainer } from './GamePlayContainer';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export const GamePlayPage: React.FC = () => {
    const { gameId } = useParams() as { gameId: string };

    return (
        <GamePlayProvider gameId={gameId}>
            <GamePlayContainer />
        </GamePlayProvider>
    );
};
