import type React from 'react';
import { useEffect, useState } from 'react';
import { changeProfileName, getProfileOrCreateIfNotExists, type Profile } from '../../Domain/Profile/Profile';
import { createGame } from '../../Domain/Game/GamesService';
import { useNavigate } from 'react-router';
import { Button } from '../../Components/Button/Button';
import { TextInput } from '../../Components/TextInput/TextInput';

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
                <TextInput label="Your Name" value={name} onChange={(v) => setName(v)} />

                <Button size="lg" disabled={submitting} onClick={onCreateGame}>
                    Create Game
                </Button>
            </form>
        </div>
    );
};
