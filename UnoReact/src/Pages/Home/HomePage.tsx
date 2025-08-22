import type React from 'react';
import { Link } from 'react-router';
import { Button } from '../../Components/Button/Button';

export const HomePage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full flex-col gap-6 md:gap-12">
            <h1 className="text-xl">Welcome</h1>

            <div className="rounded-xl bg-yellow-500 flex items-center justify-center shadow-md px-8 py-16">
                <div className="-rotate-12 w-[140px] h-[200px] md:w-[180px] md:h-[280px] rounded-full bg-black flex items-center justify-center">
                    <span className="font-extrabold text-4xl md:text-6xl tracking-wider italic text-white">UNO</span>
                </div>
            </div>

            <div className="flex gap-2 flex-col items-center">
                <Link to="/create-game">
                    <Button width="50" size="lg">
                        Create Game
                    </Button>
                </Link>
                <Link to="/join-game">
                    <Button width="50" size="lg">
                        Join Game
                    </Button>
                </Link>
            </div>
        </div>
    );
};
