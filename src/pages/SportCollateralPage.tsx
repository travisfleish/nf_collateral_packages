import { lazy, Suspense, useEffect } from 'react'
import { setPageMeta } from '../app/seo'

const PdfCollateralViewer = lazy(() =>
  import('./PdfCollateralViewer').then((m) => ({ default: m.PdfCollateralViewer }))
)

export type SportCollateralPageProps = {
  pageTitle: string
  pdfSrc: string
}

export function SportCollateralPage({ pageTitle, pdfSrc }: SportCollateralPageProps) {
  useEffect(() => {
    setPageMeta({
      title: `${pageTitle} · Genius Sports NewFront`,
      description: `${pageTitle} collateral · Genius Sports NewFront`,
    })
  }, [pageTitle])

  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#04132a]">
      <div className="flex min-h-0 w-full flex-1 flex-col px-4 pb-8 pt-0 md:px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 min-h-[55vh] md:min-h-[calc(100vh-14rem)]">
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] w-full items-center justify-center bg-[#04132a]">
                <p className="text-white/70">Loading viewer…</p>
              </div>
            }
          >
            <PdfCollateralViewer pdfSrc={pdfSrc} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
