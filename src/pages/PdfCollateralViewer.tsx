import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { PDF_PAGE_BACKGROUND } from '../theme/collateral'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

const PDF_SWAP_FADE_SEC = 0.28

/** Tuned for HTTP range/stream loading on static hosts (e.g. Vercel). */
const PDF_LOAD_OPTIONS = {
  disableRange: false,
  disableStream: false,
  disableAutoFetch: false,
} as const

const IMAGE_SRC_RE = /\.(avif|webp|png|jpe?g|svg)$/i
const SVG_SRC_RE = /\.svg(?:$|\?)/i

function isRasterCollateralSrc(src: string) {
  return IMAGE_SRC_RE.test(src)
}

function isSvgCollateralSrc(src: string) {
  return SVG_SRC_RE.test(src)
}

function normalizeSvgFontFamilies(svg: string) {
  return svg
    .replace(/KlarheitKurrent-Bold,\s*'Klarheit Kurrent'/g, 'ESKlarheitKurrentTRIAL, "Klarheit Kurrent"')
    .replace(/KlarheitKurrent-Regular,\s*'Klarheit Kurrent'/g, 'ESKlarheitKurrentTRIAL, "Klarheit Kurrent"')
    .replace(/KlarheitKurrent-Bold/g, 'ESKlarheitKurrentTRIAL')
    .replace(/KlarheitKurrent-Regular/g, 'ESKlarheitKurrentTRIAL')
}

type CollateralImageProps = {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}

function CollateralImage({ src, alt, className, style }: CollateralImageProps) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null)
  const [svgLoadError, setSvgLoadError] = useState(false)
  const isSvg = isSvgCollateralSrc(src)

  useEffect(() => {
    if (!isSvg) {
      setSvgMarkup(null)
      return
    }

    const controller = new AbortController()
    const loadSvg = async () => {
      try {
        setSvgLoadError(false)
        const response = await fetch(src, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.status}`)
        }
        const raw = await response.text()
        setSvgMarkup(normalizeSvgFontFamilies(raw))
      } catch {
        setSvgMarkup(null)
        setSvgLoadError(true)
      }
    }

    void loadSvg()
    return () => controller.abort()
  }, [isSvg, src])

  if (!isSvg) {
    return <img src={src} alt={alt} className={className} style={style} />
  }

  if (svgMarkup === null && svgLoadError) {
    return <img src={src} alt={alt} className={className} style={style} />
  }

  if (svgMarkup === null) {
    return <div className={className} style={style} aria-hidden={alt === '' ? true : undefined} />
  }

  return (
    <div
      className={`${className ?? ''} [&>svg]:block [&>svg]:h-auto [&>svg]:w-full`}
      style={style}
      aria-hidden={alt === '' ? true : undefined}
      role={alt === '' ? undefined : 'img'}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  )
}

type PdfCollateralViewerProps = {
  pdfSrc: string | string[]
  /** When true, two-column art stacks on small viewports; full side-by-side layout from `lg` up. */
  stackMobile?: boolean
  /** Shifts raster/SVG upward by percent (render-time clip, no scaling). Can be per-image for arrays. */
  imageTopCropPercent?: number | number[]
  /** Crops raster/SVG from bottom by percent. Can be per-image for arrays. */
  imageBottomCropPercent?: number | number[]
  /** Scales image display width by percent (100 = full width). Can be per-image for arrays. */
  imageWidthPercent?: number | number[]
}

export function PdfCollateralViewer({
  pdfSrc,
  stackMobile,
  imageTopCropPercent = 0,
  imageBottomCropPercent = 0,
  imageWidthPercent = 100,
}: PdfCollateralViewerProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(720)
  const [numPages, setNumPages] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const sources = Array.isArray(pdfSrc) ? pdfSrc : [pdfSrc]
  const sourceKey = sources.join('|')
  const isImage = sources.every(isRasterCollateralSrc)
  const getCropTop = (index: number) => {
    if (Array.isArray(imageTopCropPercent)) {
      return Math.max(0, imageTopCropPercent[index] ?? 0)
    }
    return Math.max(0, imageTopCropPercent)
  }
  const getCropBottom = (index: number) => {
    if (Array.isArray(imageBottomCropPercent)) {
      return Math.max(0, imageBottomCropPercent[index] ?? 0)
    }
    return Math.max(0, imageBottomCropPercent)
  }
  const getImageWidth = (index: number) => {
    if (Array.isArray(imageWidthPercent)) {
      return Math.min(100, Math.max(1, imageWidthPercent[index] ?? 100))
    }
    return Math.min(100, Math.max(1, imageWidthPercent))
  }

  useEffect(() => {
    setNumPages(null)
  }, [sourceKey])

  useEffect(() => {
    const el = measureRef.current
    if (!el) return

    const update = () => {
      setPageWidth(Math.max(240, el.clientWidth))
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (isImage) {
    if (sources.length > 1) {
      return (
        <div ref={measureRef} className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={sourceKey}
              className="w-full"
              initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : PDF_SWAP_FADE_SEC,
                ease: 'easeInOut',
              }}
            >
              <div className="mx-auto flex w-full max-w-full flex-col">
                {sources.map((src, index) => {
                  const perImageCropTop = getCropTop(index)
                  const perImageCropBottom = getCropBottom(index)
                  const isLast = index === sources.length - 1
                  const totalCrop = perImageCropTop + perImageCropBottom
                  return (
                    <div
                      key={src}
                      className="mx-auto w-full max-w-full overflow-hidden"
                      style={
                        !isLast && totalCrop > 0
                          ? { marginBottom: `-${totalCrop * (504 / 360)}%` }
                          : undefined
                      }
                    >
                    <CollateralImage
                      src={src}
                      alt=""
                      className="mx-auto block h-auto max-w-full"
                      style={
                        totalCrop > 0
                          ? {
                              width: `${getImageWidth(index)}%`,
                              transform: perImageCropTop > 0 ? `translateY(-${perImageCropTop}%)` : undefined,
                              clipPath: `inset(0 0 ${perImageCropBottom}% 0)`,
                            }
                          : { width: `${getImageWidth(index)}%` }
                      }
                    />
                  </div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )
    }

    const singleSrc = sources[0]
    const cropTop = getCropTop(0)
    const cropBottom = getCropBottom(0)
    const singleImage =
      cropTop > 0 || cropBottom > 0 ? (
        <div className="mx-auto w-full max-w-full overflow-hidden">
          <CollateralImage
            src={singleSrc}
            alt=""
            className="mx-auto block h-auto max-w-full"
            style={{
              width: `${getImageWidth(0)}%`,
              transform: cropTop > 0 ? `translateY(-${cropTop}%)` : undefined,
              transformOrigin: 'top center',
              clipPath: `inset(0 0 ${cropBottom}% 0)`,
            }}
          />
        </div>
      ) : (
        <CollateralImage
          src={singleSrc}
          alt=""
          className="mx-auto block h-auto max-w-full"
          style={{ width: `${getImageWidth(0)}%` }}
        />
      )

    return (
      <div ref={measureRef} className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={sourceKey}
            className="w-full"
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : PDF_SWAP_FADE_SEC,
              ease: 'easeInOut',
            }}
          >
            {stackMobile ? (
              <>
                <div className="hidden w-full lg:block">{singleImage}</div>
                <div className="mx-auto flex w-full max-w-2xl flex-col lg:hidden">
                  {/* Two-column art (viewBox 740×504): left 360 + right 360 */}
                  <div
                    className="w-full overflow-hidden"
                    style={{ aspectRatio: '360 / 504' }}
                  >
                    <CollateralImage
                      src={singleSrc}
                      alt=""
                      className="block h-auto max-w-none"
                      style={{ width: 'calc(100% * 740 / 360)' }}
                    />
                  </div>
                  <div
                    className="w-full overflow-hidden"
                    style={{ aspectRatio: '360 / 504' }}
                  >
                    <CollateralImage
                      src={singleSrc}
                      alt=""
                      className="block h-auto max-w-none"
                      style={{
                        width: 'calc(100% * 740 / 360)',
                        marginLeft: 'calc(-100% * 380 / 360)',
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              singleImage
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div ref={measureRef} className="collateral-pdf w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={sourceKey}
          className="w-full"
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : PDF_SWAP_FADE_SEC,
            ease: 'easeInOut',
          }}
        >
          <Document
            className="w-full"
            file={sources[0]}
            options={PDF_LOAD_OPTIONS}
            loading={
              <div className="flex min-h-[50vh] w-full items-center justify-center">
                <p className="text-white/70">Loading PDF…</p>
              </div>
            }
            error={<p className="text-white/90">Failed to load PDF.</p>}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          >
            {numPages !== null &&
              Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={i + 1}
                  pageNumber={i + 1}
                  width={pageWidth}
                  canvasBackground={PDF_PAGE_BACKGROUND}
                  loading={
                    <div className="flex min-h-[40vh] w-full items-center justify-center">
                      <p className="text-white/70">Loading page…</p>
                    </div>
                  }
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mx-auto border-0 shadow-none outline-none [&_.react-pdf__Page__canvas]:mx-auto [&_.react-pdf__Page__canvas]:block"
                />
              ))}
          </Document>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
