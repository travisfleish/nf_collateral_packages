import { MarketingPageLayout } from '@genius-sports/gs-marketing-ui'
import { SiteHeader } from '../components/navigation/SiteHeader'
import { SiteFooter } from '../components/navigation/SiteFooter'
import { AppRoutes } from './routes'

export function App() {
  return (
    <MarketingPageLayout className="flex min-h-screen flex-col">
      <SiteHeader />
      <AppRoutes />
      <SiteFooter />
    </MarketingPageLayout>
  )
}
