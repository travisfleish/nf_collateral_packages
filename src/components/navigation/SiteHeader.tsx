import { useEffect, useMemo, useState } from 'react'
import { StripHoverBg } from '../common/StripHoverBg'
import geniusLogoUrl from '@genius-sports/gs-marketing-ui/assets/logos/genius_logo.svg?url'

/** Scroll distance (px) over which the header slides away (opaque navy — no element opacity, so white content never bleeds through). */
const HEADER_HIDE_SCROLL_RANGE = 200

/** Clears the fixed header (logo `h-24` + bar padding). */
export const SITE_HEADER_MAIN_OFFSET_CLASS = 'pt-24'

export function SiteHeader() {
  const [scrollY, setScrollY] = useState(0)

  /** 1 = fully visible, 0 = hidden (slid up). */
  const headerReveal = useMemo(() => {
    return Math.min(1, Math.max(0, 1 - scrollY / HEADER_HIDE_SCROLL_RANGE))
  }, [scrollY])

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
      className="fixed inset-x-0 top-0 z-50 bg-[#060a37]"
      style={{
        transform: `translateY(${(1 - headerReveal) * -100}%)`,
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
                className="h-24 w-auto object-contain object-left brightness-0 invert"
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
                <span className="relative z-20 block whitespace-nowrap rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none text-white transition-colors duration-300 ease-in-out group-hover:text-[#060a37] sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem]">
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
