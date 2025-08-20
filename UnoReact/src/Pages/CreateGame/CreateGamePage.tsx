import type React from 'react';
import { useEffect, useState } from 'react';
import { changeProfileName, getProfileOrCreateIfNotExists, type Profile } from '../../Domain/Profile/Profile';
import { createGame } from '../../Domain/Game/GamesService';
import { useNavigate } from 'react-router';

export const CreateGamePage: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const profile = getProfileOrCreateIfNotExists();
        setProfile(profile);
        setName(profile.name);
    }, []);

    const onCreateGame = () => {
        if (name.trim().length === 0 || !profile) {
            alert('Invalid data');
            return;
        }

        setSubmitting(true);

        createGame({
            id: profile.id,
            name: name,
        })
            .then((game) => {
                changeProfileName(name);
                navigate(`/games/${game.id}`);
            })
            .catch(() => alert('Failed to create game'))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="h-full flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-center mb-6">Create Game</h1>
            <form className="flex flex-col space-y-4">
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
                        className="w-72 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
                    onClick={onCreateGame}
                >
                    Create Game
                </button>
            </form>
        </div>
    );
};
