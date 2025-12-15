import { Outlet } from 'react-router-dom';
import SEO from './components/common/SEO';
import Toast from './components/common/Toast';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <SEO />
      <Toast />
      <Outlet />
    </ToastProvider>
  );
}

export default App;