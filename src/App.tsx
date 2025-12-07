import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div>
      <Header />
      <main>
        {/* 2. [핵심] Outlet: 여기가 바로 URL에 따라 내용이 갈아 끼워지는 '구멍'입니다. */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;