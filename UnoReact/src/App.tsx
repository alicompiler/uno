import { Background } from './Components/Background/Background';
import { MessageProvider } from './Components/MessageProvider/MessageProvider';
import { SoundEffectProvider } from './Domain/SoundEffectProvider/SoundEffectProvider';
import { Router } from './Root/Router';

export const SOUND_EFFECT_KEY_GAME_STARTED = 'game-started';
export const SOUND_EFFECT_KEY_YOU_WIN = 'you-win';
export const SOUND_EFFECT_KEY_YOU_LOSE = 'you-lose';
export const SOUND_EFFECT_KEY_RED = 'red';
export const SOUND_EFFECT_KEY_YELLOW = 'yellow';
export const SOUND_EFFECT_KEY_BLUE = 'blue';
export const SOUND_EFFECT_KEY_GREEN = 'green';
export const SOUND_EFFECT_KEY_NEW_TURN = 'new-turn';

const sounds: Record<string, string> = {
    [SOUND_EFFECT_KEY_GAME_STARTED]: '/sound/game-start.mp3',
    [SOUND_EFFECT_KEY_YOU_WIN]: '/sound/applause.mp3',
    [SOUND_EFFECT_KEY_YOU_LOSE]: '/sound/losing_horn.mp3',
    [SOUND_EFFECT_KEY_RED]: '/sound/red.mp3',
    [SOUND_EFFECT_KEY_YELLOW]: '/sound/yellow.mp3',
    [SOUND_EFFECT_KEY_BLUE]: '/sound/blue.mp3',
    [SOUND_EFFECT_KEY_GREEN]: '/sound/green.mp3',
    [SOUND_EFFECT_KEY_NEW_TURN]: '/sound/new.mp3',
};

function App() {
    return (
        <MessageProvider duration={3000}>
            <SoundEffectProvider sounds={sounds}>
                <div className="h-screen max-h-screen w-full max-w-full text-white">
                    <Background>
                        <Router />
                    </Background>
                </div>
            </SoundEffectProvider>
        </MessageProvider>
    );
}

export default App;
