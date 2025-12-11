import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PATH } from './constants/path';
import Spinner from '../components/common/Spinner';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN} replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
