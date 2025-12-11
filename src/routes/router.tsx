import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants/path';
import App from '../App';
import MainPage from '../pages/MainPage';
import DetailPage from '../pages/DetailPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: PATH.HOME,
                element: <MainPage />,
            },
            {
                path: PATH.LOGIN,
                element: <LoginPage />,
            },
            {
                path: PATH.SIGNUP,
                element: <div>Signup Page Content</div>,
            },
            {
                path: PATH.ARTIFACT_DETAIL,
                element: <DetailPage />,
            },
            {
                path: PATH.WRITE,
                element: (
                    <PrivateRoute>
                        <div>Write Page Content</div>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);