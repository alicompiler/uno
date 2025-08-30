import { useParams } from 'react-router';
import { GamePlayProvider } from '../../Domain/GamePlay/GamePlayProvider';
import { EventsContainer } from './EventsContainer';
import { GamePlayContainer } from './GamePlayContainer';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export const GamePlayPage: React.FC = () => {
    const { gameId } = useParams() as { gameId: string };
    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            <GamePlayProvider gameId={gameId}>
                <EventsContainer />
                <GamePlayContainer />
            </GamePlayProvider>
        </div>
    );
};
