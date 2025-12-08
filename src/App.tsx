import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const StyledMain = styled.main`
  min-height: calc(100vh - 300px); /* Prevent footer from jumping up */
`;

function App() {
  return (
    <div>
      <Header />
      <StyledMain>
        {/* 2. [핵심] Outlet: 여기가 바로 URL에 따라 내용이 갈아 끼워지는 '구멍'입니다. */}
        <Outlet />
      </StyledMain>
      <Footer />
    </div>
  );
}

export default App;