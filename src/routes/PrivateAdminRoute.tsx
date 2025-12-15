import { Navigate } from 'react-router-dom';
import { useAdminAuthContext } from '../contexts/AdminAuthContext';
import { PATH } from './constants/path';
import Spinner from '../components/common/Spinner';

interface PrivateAdminRouteProps {
    children: React.ReactNode;
}

const PrivateAdminRoute = ({ children }: PrivateAdminRouteProps) => {
    const { isAdminLoggedIn, isLoading } = useAdminAuthContext();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isAdminLoggedIn) {
        return <Navigate to={PATH.ADMIN_LOGIN} replace />;
    }

    return <>{children}</>;
};

export default PrivateAdminRoute;
