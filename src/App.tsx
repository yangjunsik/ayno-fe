import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SEO from './components/common/SEO';
import Toast from './components/common/Toast';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { PATH } from './routes/constants/path';

const StyledMain = styled.main`
  min-height: calc(100vh - 300px); /* Prevent footer from jumping up */
`;

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === PATH.LOGIN;

  return (
    <ToastProvider>
      <AuthProvider>
        <SEO />
        <Toast />
        <Header />
        <StyledMain>
          {/* 2. [핵심] Outlet: 여기가 바로 URL에 따라 내용이 갈아 끼워지는 '구멍'입니다. */}
          <Outlet />
        </StyledMain>
        {!isLoginPage && location.pathname !== PATH.SIGNUP && <Footer />}
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;