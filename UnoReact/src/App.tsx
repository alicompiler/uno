import { Background } from './Components/Background/Background';
import { Router } from './Root/Router';

function App() {
    return (
        <div className="h-screen max-h-screen w-full max-w-full text-white">
            <Background>
                <Router />
            </Background>
        </div>
    );
}

export default App;
