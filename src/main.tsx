import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './routes/router.tsx'
import GlobalStyle from './styles/GlobalStyle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
