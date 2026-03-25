import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

/** Matches main shell (`bg-[#04132a]`). react-pdf Page defaults its wrapper to white otherwise. */
const PDF_SURFACE_BG = '#04132a'

const PDF_SWAP_FADE_SEC = 0.28

/** Tuned for HTTP range/stream loading on static hosts (e.g. Vercel). */
const PDF_LOAD_OPTIONS = {
  disableRange: false,
  disableStream: false,
  disableAutoFetch: false,
} as const

type PdfCollateralViewerProps = {
  pdfSrc: string
}

export function PdfCollateralViewer({ pdfSrc }: PdfCollateralViewerProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(720)
  const [numPages, setNumPages] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

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

  return (
    <div
      ref={measureRef}
      className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 min-h-[55vh] md:min-h-[calc(100vh-14rem)]"
    >
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
            className="w-full bg-[#04132a]"
            file={pdfSrc}
            options={PDF_LOAD_OPTIONS}
            loading={
              <div className="flex min-h-[50vh] w-full items-center justify-center bg-[#04132a]">
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
                  canvasBackground={PDF_SURFACE_BG}
                  loading={
                    <div className="flex min-h-[40vh] w-full items-center justify-center">
                      <p className="text-white/70">Loading page…</p>
                    </div>
                  }
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="mx-auto [&_.react-pdf__Page__canvas]:mx-auto [&_.react-pdf__Page__canvas]:block"
                />
              ))}
          </Document>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
