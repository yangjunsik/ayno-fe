import { createBrowserRouter } from 'react-router-dom';
import { PATH } from './constants/path';
import App from './App'; // 방금 만든 껍데기 import
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // [핵심] 최상위 경로에 껍데기(App)를 지정
        children: [ // [이해] App 안에 들어갈 자식들을 배열로 정의
            {
                path: PATH.HOME,
                element: <MainPage />,
            },

            {
                path: PATH.LOGIN,
                element: <div>Login Page Content</div>,
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
                element: <div>Write Page Content</div>,
            },
        ],
    },
]);