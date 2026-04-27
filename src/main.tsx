import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import NineXConcierge from './components/Ad9xAgent.tsx'
import BattleButton from './components/BattleButton.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { TRPCProvider } from '@/providers/trpc'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TRPCProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        <NineXConcierge />
        <BattleButton />
      </TRPCProvider>
    </HashRouter>
  </StrictMode>,
)
