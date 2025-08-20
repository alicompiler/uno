import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage } from '../Pages/Home/HomePage';
import { CreateGamePage } from '../Pages/CreateGame/CreateGamePage';
import { GamePlayPage } from '../Pages/GamePlay/GamePlayPage';
import { JoinGamePage } from '../Pages/JoinGame/JoinGamePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/create-game',
        element: <CreateGamePage />,
    },
    {
        path: '/join-game',
        element: <JoinGamePage />,
    },
    {
        path: '/games/:gameId',
        element: <GamePlayPage />,
    },
]);

export const Router = () => {
    return <RouterProvider router={router} />;
};
