import { useParams } from 'react-router';

export const GamePlayPage: React.FC = () => {
    const { gameId } = useParams() as { gameId: string };

    return (
        <div>
            <h1>Game Play: {gameId}</h1>
        </div>
    );
};
