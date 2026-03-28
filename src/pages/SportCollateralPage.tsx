import { lazy, Suspense, useEffect, useId } from 'react'
import { setPageMeta } from '../app/seo'

const PdfCollateralViewer = lazy(() =>
  import('./PdfCollateralViewer').then((m) => ({ default: m.PdfCollateralViewer }))
)

export type SportCollateralPageProps = {
  pageTitle: string
  pdfSrc: string | string[]
  /** Optional heading rendered above collateral image/PDF area. */
  collateralHeader?: string
  /** Heading presentation style. */
  collateralHeaderStyle?: 'plain' | 'treatment'
  /** Fill color for treatment style header. */
  collateralHeaderFill?: string
  /** Stack two-column raster/SVG collateral vertically (all breakpoints) */
  stackMobile?: boolean
  /** Shifts raster/SVG upward by percent (render-time clip, no scaling). Can be per-image for arrays. */
  imageTopCropPercent?: number | number[]
  /** Crops raster/SVG from bottom by percent. Can be per-image for arrays. */
  imageBottomCropPercent?: number | number[]
  /** Scales image display width by percent (100 = full width). Can be per-image for arrays. */
  imageWidthPercent?: number | number[]
}

export function SportCollateralPage({
  pageTitle,
  pdfSrc,
  collateralHeader,
  collateralHeaderStyle = 'plain',
  collateralHeaderFill = '#92d6e3',
  stackMobile,
  imageTopCropPercent,
  imageBottomCropPercent,
  imageWidthPercent,
}: SportCollateralPageProps) {
  const headerMaskId = useId()

  useEffect(() => {
    setPageMeta({
      title: `${pageTitle} · Genius Sport NewFront`,
      description: `${pageTitle} collateral · Genius Sport NewFront`,
    })
  }, [pageTitle])

  return (
    <main className="flex min-h-0 flex-col bg-pdfSurface">
      <div className="flex min-h-0 w-full flex-col px-4 pb-10 pt-0 md:px-6 md:pb-12">
        <div
          className={`mx-auto flex w-full max-w-5xl flex-col items-center ${
            collateralHeader ? 'gap-0' : 'gap-6'
          }`}
        >
          {collateralHeader ? (
            collateralHeaderStyle === 'treatment' ? (
              <div className="w-full">
                <svg
                  viewBox="0 0 1200 160"
                  className="h-auto w-full max-w-[980px] -translate-x-3 -translate-y-2"
                  role="img"
                  aria-label={collateralHeader}
                >
                  <defs>
                    <mask id={headerMaskId} maskUnits="userSpaceOnUse" x="118" y="20" width="980" height="120">
                      <path d="M118 20 H620 A16 16 0 0 1 636 36 V104 A16 16 0 0 1 620 120 H118 Z" fill="#fff" />
                      <text
                        x="377"
                        y="70"
                        fill="#000"
                        fontSize="62"
                        fontWeight="500"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        dy="0.08em"
                        letterSpacing="0.4"
                        style={{ fontFamily: 'Klarheit Kurrent, KlarheitKurrent-Bold, sans-serif' }}
                      >
                        {collateralHeader}
                      </text>
                    </mask>
                  </defs>

                  {/* 5 vertical bars */}
                  <rect x="8" y="20" width="12" height="100" fill={collateralHeaderFill} />
                  <rect x="30" y="20" width="12" height="100" fill={collateralHeaderFill} />
                  <rect x="52" y="20" width="12" height="100" fill={collateralHeaderFill} />
                  <rect x="74" y="20" width="12" height="100" fill={collateralHeaderFill} />
                  <rect x="96" y="20" width="12" height="100" fill={collateralHeaderFill} />

                  {/* Left-square / right-rounded treatment bar */}
                  <path
                    d="M118 20 H620 A16 16 0 0 1 636 36 V104 A16 16 0 0 1 620 120 H118 Z"
                    fill={collateralHeaderFill}
                    mask={`url(#${headerMaskId})`}
                  />
                </svg>
              </div>
            ) : (
              <h1 className="w-full text-left text-4xl font-bold tracking-wide text-white md:text-5xl">
                {collateralHeader}
              </h1>
            )
          ) : null}
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] w-full items-center justify-center">
                <p className="text-white/70">Loading viewer…</p>
              </div>
            }
          >
            <div className="-mx-4 w-[calc(100%+2rem)] md:mx-0 md:w-full">
              <PdfCollateralViewer
                pdfSrc={pdfSrc}
                stackMobile={stackMobile}
                imageTopCropPercent={imageTopCropPercent}
                imageBottomCropPercent={imageBottomCropPercent}
                imageWidthPercent={imageWidthPercent}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  )
}
