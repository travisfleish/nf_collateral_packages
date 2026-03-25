import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { StripHoverBg } from '../common/StripHoverBg'
import geniusLogoUrl from '@genius-sports/gs-marketing-ui/assets/logos/genius_logo.svg?url'

/** Scroll distance (px) over which the header slides away (opaque navy — no element opacity, so white content never bleeds through). */
const HEADER_HIDE_SCROLL_RANGE = 200

/** Clears the fixed header (logo `h-16` mobile / `h-24` md+ + bar padding). */
export const SITE_HEADER_MAIN_OFFSET_CLASS = 'pt-20 md:pt-24'

/** Approximate header height before ResizeObserver runs (mobile-first). */
const FALLBACK_HEADER_HEIGHT_PX = 80

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [headerHeightPx, setHeaderHeightPx] = useState(FALLBACK_HEADER_HEIGHT_PX)

  /** 1 = fully visible, 0 = hidden (slid up). */
  const headerReveal = useMemo(() => {
    return Math.min(1, Math.max(0, 1 - scrollY / HEADER_HIDE_SCROLL_RANGE))
  }, [scrollY])

  /** Percent-based translate causes subpixel gaps (brief hairline) at the header bottom; px + round fixes it. */
  const translateYPx = useMemo(() => {
    const h = headerHeightPx > 0 ? headerHeightPx : FALLBACK_HEADER_HEIGHT_PX
    return Math.round((headerReveal - 1) * h)
  }, [headerReveal, headerHeightPx])

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    const syncHeight = () => {
      const raw = el.offsetHeight || Math.round(el.getBoundingClientRect().height)
      if (raw > 0) setHeaderHeightPx(raw)
    }
    syncHeight()
    const rafId = requestAnimationFrame(syncHeight)

    const ro = new ResizeObserver(syncHeight)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    let raf = 0
    const readScroll = () => {
      raf = 0
      setScrollY(window.scrollY)
    }
    const handleScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(readScroll)
    }

    readScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf !== 0) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-[#04132a] [backface-visibility:hidden]"
      style={{
        transform: `translate3d(0, ${translateYPx}px, 0)`,
        pointerEvents: headerReveal < 0.02 ? 'none' : 'auto',
      }}
    >
      <div className="relative">
        <div className="w-full">
          <div className="relative flex w-full items-center gap-4 max-xl:px-4 max-xl:py-2 max-xl:md:px-6 max-xl:md:py-0 max-xl:md:pt-2 xl:container xl:mx-auto xl:py-2 xl:md:items-stretch xl:md:py-0 xl:md:pt-2">
            <a
              href="https://www.geniussports.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Genius Sports"
              className="flex min-w-0 flex-shrink-0 items-center"
            >
              <img
                src={geniusLogoUrl}
                alt="Genius Sports"
                className="h-16 w-auto object-contain object-left brightness-0 invert md:h-24"
              />
            </a>

            <a
              href="https://www.geniussports.com"
              target="_blank"
              rel="noreferrer"
              className="group ml-auto inline-flex max-w-[20.9375rem] flex-shrink-0 items-center"
            >
              <div className="relative cursor-pointer overflow-hidden rounded-pill bg-white/10">
                <StripHoverBg />
                <span className="relative z-20 block whitespace-nowrap rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none text-white transition-colors duration-300 ease-in-out group-hover:text-[#04132a] sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem]">
                  Visit Genius Sports
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
