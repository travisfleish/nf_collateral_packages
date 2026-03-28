import { createRoot } from 'react-dom/client'
import geniusLogoUrl from '@genius-sports/gs-marketing-ui/assets/logos/genius_g_logo.svg?url'
import './styles/index.css'
import { Providers } from './app/providers'
import { App } from './app/App'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element not found')

const faviconEl = document.getElementById('app-favicon') as HTMLLinkElement | null
if (faviconEl) faviconEl.href = geniusLogoUrl

createRoot(rootEl).render(
  <Providers>
    <App />
  </Providers>,
)