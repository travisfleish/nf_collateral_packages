import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { setPageMeta } from '../app/seo'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

/** Matches main shell (`bg-[#04132a]`). react-pdf Page defaults its wrapper to white otherwise. */
const PDF_SURFACE_BG = '#04132a'

const PDF_SWAP_FADE_SEC = 0.28

export type SportCollateralPageProps =
  | { pageTitle: string; pdfSrc: string }
  | { pageTitle: string; imageSrc: string }

export function SportCollateralPage(props: SportCollateralPageProps) {
  const { pageTitle } = props
  const isPdf = 'pdfSrc' in props
  const pdfSrc = isPdf ? props.pdfSrc : undefined
  const imageSrc = !isPdf ? props.imageSrc : undefined

  const measureRef = useRef<HTMLDivElement>(null)
  const [pageWidth, setPageWidth] = useState(720)
  const [numPages, setNumPages] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setPageMeta({
      title: `${pageTitle} · Genius Sports NewFront`,
      description: `${pageTitle} collateral · Genius Sports NewFront`,
    })
  }, [pageTitle])

  useEffect(() => {
    setNumPages(null)
  }, [pdfSrc])

  useEffect(() => {
    if (!isPdf) return
    const el = measureRef.current
    if (!el) return

    const update = () => {
      setPageWidth(Math.max(240, el.clientWidth))
    }
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isPdf])

  return (
    <main className="flex min-h-0 flex-1 flex-col bg-[#04132a]">
      <div className="flex min-h-0 w-full flex-1 flex-col px-4 pb-8 pt-0 md:px-6">
        <div
          ref={measureRef}
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 min-h-[55vh] md:min-h-[calc(100vh-14rem)]"
        >
          {isPdf && pdfSrc ? (
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
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={`${pageTitle} collateral`}
              className="mx-auto h-auto w-full max-w-5xl bg-white"
            />
          ) : null}
        </div>
      </div>
    </main>
  )
}
