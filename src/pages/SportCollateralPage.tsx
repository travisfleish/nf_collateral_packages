import { lazy, Suspense, useEffect } from 'react'
import { setPageMeta } from '../app/seo'

const PdfCollateralViewer = lazy(() =>
  import('./PdfCollateralViewer').then((m) => ({ default: m.PdfCollateralViewer }))
)

export type SportCollateralPageProps = {
  pageTitle: string
  pdfSrc: string
  /** Stack two-column raster/SVG collateral vertically (all breakpoints) */
  stackMobile?: boolean
}

export function SportCollateralPage({ pageTitle, pdfSrc, stackMobile }: SportCollateralPageProps) {
  useEffect(() => {
    setPageMeta({
      title: `${pageTitle} · Genius Sports NewFront`,
      description: `${pageTitle} collateral · Genius Sports NewFront`,
    })
  }, [pageTitle])

  return (
    <main className="flex min-h-0 flex-col bg-pdfSurface">
      <div className="flex min-h-0 w-full flex-col px-4 pb-10 pt-0 md:px-6 md:pb-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] w-full items-center justify-center">
                <p className="text-white/70">Loading viewer…</p>
              </div>
            }
          >
            <PdfCollateralViewer pdfSrc={pdfSrc} stackMobile={stackMobile} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
