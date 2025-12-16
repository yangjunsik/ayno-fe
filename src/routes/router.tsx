
import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import WritePage from '../pages/WritePage';
import DetailPage from '../pages/DetailPage';
import { PATH } from './constants/path';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminInterestPage from '../pages/admin/resource/AdminInterestPage';
import AdminJobRolePage from '../pages/admin/resource/AdminJobRolePage';
import AdminToolPage from '../pages/admin/resource/AdminToolPage';
import AdminReportPage from '../pages/admin/report/AdminReportPage';
import AdminUserPage from '../pages/admin/user/AdminUserPage';
import PrivateAdminRoute from './PrivateAdminRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { AdminAuthProvider } from '../contexts/AdminAuthContext';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // Admin Scope
            {
                element: (
                    <AdminAuthProvider>
                        <Outlet />
                    </AdminAuthProvider>
                ),
                children: [
                    {
                        path: PATH.ADMIN_LOGIN,
                        element: <AdminLoginPage />,
                    },
                    {
                        path: PATH.ADMIN,
                        element: (
                            <PrivateAdminRoute>
                                <AdminLayout />
                            </PrivateAdminRoute>
                        ),
                        children: [
                            {
                                index: true,
                                element: <AdminDashboard />,
                            },
                            {
                                path: 'interests',
                                element: <AdminInterestPage />,
                            },
                            {
                                path: 'jobs',
                                element: <AdminJobRolePage />,
                            },
                            {
                                path: 'tools',
                                element: <AdminToolPage />,
                            },
                            {
                                path: 'reports',
                                element: <AdminReportPage />,
                            },
                            {
                                path: 'users',
                                element: <AdminUserPage />,
                            },
                        ],
                    },
                ],
            },
            // User Scope
            {
                element: (
                    <AuthProvider>
                        <Outlet />
                    </AuthProvider>
                ),
                children: [
                    {
                        element: <MainLayout />,
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
                                element: <SignupPage />,
                            },
                            {
                                path: PATH.WRITE,
                                element: (
                                    <PrivateRoute>
                                        <WritePage />
                                    </PrivateRoute>
                                ),
                            },
                            {
                                path: PATH.ARTIFACT_DETAIL,
                                element: <DetailPage />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);