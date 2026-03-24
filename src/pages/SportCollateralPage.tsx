import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { setPageMeta } from '../app/seo'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

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
    <main className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex min-h-0 w-full flex-1 flex-col px-4 pb-8 pt-2 md:px-6 md:pt-4">
        <div
          ref={measureRef}
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 min-h-[55vh] md:min-h-[calc(100vh-14rem)]"
        >
          {isPdf && pdfSrc ? (
            <Document
              key={pdfSrc}
              file={pdfSrc}
              loading={<p className="text-neutral-500">Loading PDF…</p>}
              error={<p className="text-neutral-600">Failed to load PDF.</p>}
              onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            >
              {numPages !== null &&
                Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="mx-auto bg-white [&_.react-pdf__Page__canvas]:mx-auto [&_.react-pdf__Page__canvas]:block"
                  />
                ))}
            </Document>
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
