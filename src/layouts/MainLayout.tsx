import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { PATH } from '../routes/constants/path';

const StyledMain = styled.main`
  min-height: calc(100vh - 300px); /* Prevent footer from jumping up */
`;

const MainLayout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === PATH.LOGIN;

    return (
        <>
            <Header />
            <StyledMain>
                <Outlet />
            </StyledMain>
            {!isLoginPage && location.pathname !== PATH.SIGNUP && <Footer />}
        </>
    );
};

export default MainLayout;
