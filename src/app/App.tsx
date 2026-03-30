import { MarketingPageLayout } from '@genius-sports/gs-marketing-ui'
import { CollateralHero } from '../components/common/CollateralHero'
import { ContactCtaSection } from '../components/common/ContactCtaSection'
import { SiteHeader, SITE_HEADER_MAIN_OFFSET_CLASS } from '../components/navigation/SiteHeader'
import { SiteFooter } from '../components/navigation/SiteFooter'
import { AppRoutes } from './routes'

export function App() {
  return (
    <MarketingPageLayout className="flex min-h-screen flex-col !bg-pdfSurface text-white">
      <SiteHeader />
      <div
        className={`flex min-h-0 flex-col ${SITE_HEADER_MAIN_OFFSET_CLASS}`}
      >
        <CollateralHero />
        <AppRoutes />
      </div>
      <ContactCtaSection />
      <SiteFooter />
    </MarketingPageLayout>
  )
}
