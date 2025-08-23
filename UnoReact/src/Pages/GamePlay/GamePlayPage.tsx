import { useParams } from 'react-router';
import { GamePlayProvider } from '../../Domain/GamePlay/GamePlayProvider';
import { GamePlayContainer } from './GamePlayContainer';
import { MessageProvider } from '../../Components/MessageProvider/MessageProvider';
import { EventMessagesContainer } from './EventMessagesContainer';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export const GamePlayPage: React.FC = () => {
    const { gameId } = useParams() as { gameId: string };

    return (
        <MessageProvider duration={3000}>
            <GamePlayProvider gameId={gameId}>
                <EventMessagesContainer />
                <GamePlayContainer />
            </GamePlayProvider>
        </MessageProvider>
    );
};
