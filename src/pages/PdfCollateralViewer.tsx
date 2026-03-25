import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

function isRasterCollateralSrc(src: string) {
  return IMAGE_SRC_RE.test(src)
}

type PdfCollateralViewerProps = {
  pdfSrc: string
  /** When true, two-column raster/SVG collateral is shown as vertically stacked panels at all breakpoints. */
  stackMobile?: boolean
}

export function PdfCollateralViewer({ pdfSrc, stackMobile }: PdfCollateralViewerProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(720)
  const [numPages, setNumPages] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const isImage = isRasterCollateralSrc(pdfSrc)

  useEffect(() => {
    setNumPages(null)
  }, [pdfSrc])

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
    const singleImage = (
      <img
        src={pdfSrc}
        alt=""
        className="mx-auto block h-auto w-full max-w-full"
      />
    )

    return (
      <div ref={measureRef} className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={pdfSrc}
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
              <div className="flex flex-col">
                {/* Two-column art (viewBox 740×504): left 360 + right 360 */}
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: '360 / 504' }}
                >
                  <img
                    src={pdfSrc}
                    alt=""
                    className="block h-auto max-w-none"
                    style={{ width: 'calc(100% * 740 / 360)' }}
                  />
                </div>
                <div
                  className="w-full overflow-hidden"
                  style={{ aspectRatio: '360 / 504' }}
                >
                  <img
                    src={pdfSrc}
                    alt=""
                    className="block h-auto max-w-none"
                    style={{
                      width: 'calc(100% * 740 / 360)',
                      marginLeft: 'calc(-100% * 380 / 360)',
                    }}
                  />
                </div>
              </div>
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
          key={pdfSrc}
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
            file={pdfSrc}
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
