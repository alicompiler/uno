import type React from 'react';
import { Link } from 'react-router';

export const HomePage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full flex-col gap-6 md:gap-12">
            <h1 className="text-xl">Welcome</h1>

            <div className="rounded-xl bg-indigo-500 flex items-center justify-center shadow-md px-8 py-16">
                <div className="-rotate-12 w-[140px] h-[200px] md:w-[180px] md:h-[280px] rounded-full bg-amber-700 flex items-center justify-center">
                    <span className="font-extrabold text-4xl md:text-6xl tracking-wider italic text-white">UNO</span>
                </div>
            </div>

            <div className="flex gap-2 flex-col items-center">
                <Link to="/create-game">
                    <button className="w-52 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white px-8 py-4 rounded cursor-pointer">
                        Create Game
                    </button>
                </Link>
                <Link to="/join-game">
                    <button className="w-52 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white px-8 py-4 rounded cursor-pointer">
                        Join Game
                    </button>
                </Link>
            </div>
        </div>
    );
};
