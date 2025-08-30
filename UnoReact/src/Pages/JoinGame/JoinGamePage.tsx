import type React from 'react';
import { useEffect, useState } from 'react';
import { changeProfileName, getProfileOrCreateIfNotExists, type Profile } from '../../Domain/Profile/Profile';
import { joinGame } from '../../Domain/Game/GamesService';
import { useNavigate } from 'react-router';
import { Button } from '../../Components/Button/Button';
import { TextInput } from '../../Components/TextInput/TextInput';
import { useSoundEffects } from '../../Domain/SoundEffectProvider/UseSoundEffects';

export const JoinGamePage: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [name, setName] = useState('');
    const gameIdFromParams = new URLSearchParams(window.location.search).get('gameId');
    const [gameId, setGameId] = useState(gameIdFromParams ?? '');
    const navigate = useNavigate();
    const { loadAll } = useSoundEffects();

    useEffect(() => {
        const profile = getProfileOrCreateIfNotExists();
        setProfile(profile);
        setName(profile.name);
    }, []);

    const onJoinGame = () => {
        loadAll();

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
        <div className="h-screen flex items-center justify-center flex-col">
            <h1 className="text-2xl font-bold text-center mb-6">Join Game</h1>
            <form className="flex flex-col space-y-4">
                <TextInput
                    label="Game Id"
                    value={gameId}
                    onChange={(v) => setGameId(v)}
                    disabled={gameIdFromParams !== null}
                />

                <TextInput label="Your Name" value={name} onChange={(v) => setName(v)} />

                <Button size="lg" disabled={submitting} onClick={onJoinGame}>
                    Join Game
                </Button>
            </form>
        </div>
    );
};
