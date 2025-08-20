import type React from 'react';
import { useEffect, useState } from 'react';
import { changeProfileName, getProfileOrCreateIfNotExists, type Profile } from '../../Domain/Profile/Profile';
import { joinGame } from '../../Domain/Game/GamesService';
import { useNavigate } from 'react-router';

export const JoinGamePage: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const gameIdFromParams = new URLSearchParams(window.location.search).get('gameId');
    const [gameId, setGameId] = useState(gameIdFromParams ?? '');
    const navigate = useNavigate();

    useEffect(() => {
        const profile = getProfileOrCreateIfNotExists();
        setProfile(profile);
        setName(profile.name);
    }, []);

    const onCreateGame = () => {
        if (gameId.trim().length === 0 || name.trim().length === 0 || !profile) {
            alert('Invalid data');
            return;
        }

        setSubmitting(true);

        joinGame(gameId, {
            id: profile.id,
            name,
        })
            .then(() => {
                changeProfileName(name);
                navigate(`/games/${gameId}`);
            })
            .catch(() => alert('Failed to join game'))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="h-full flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-center mb-6">Join Game</h1>
            <form className="flex flex-col space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium mb-1">
                        Game Id
                    </label>
                    <input
                        id="gameId"
                        type="text"
                        disabled={gameIdFromParams !== null}
                        value={gameId}
                        placeholder="Enter the game id"
                        onChange={(e) => setGameId(e.target.value)}
                        className="w-96 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium mb-1">
                        Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-96 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
                    onClick={onCreateGame}
                >
                    Join Game
                </button>
            </form>
        </div>
    );
};
