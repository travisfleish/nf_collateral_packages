import { NavLink } from 'react-router-dom'
import { Heading } from '@genius-sports/gs-marketing-ui'
import { siteContent } from '../../content/site'
import { StripHoverBg } from './StripHoverBg'

export function CollateralHero() {
  const items = siteContent.collateralNav

  return (
    <section
      aria-labelledby="newfronts-hero-title"
      className="w-full shrink-0 bg-pdfSurface text-white"
    >
      <div className="container mx-auto flex flex-col items-center px-4 pb-8 pt-12 md:px-6 md:pb-10 md:pt-24 lg:pb-12 lg:pt-28">
        <Heading
          id="newfronts-hero-title"
          level="h1"
          className="w-full min-w-0 max-w-4xl text-balance text-center !text-white max-md:!text-[clamp(1.625rem,3.25vw+0.875rem,4.5rem)] max-md:!leading-[1.1] max-md:!tracking-[-0.02em] md:!text-brand-h1"
        >
          Genius Sports NewFront
        </Heading>
        <a
          href={siteContent.momentsCta.href}
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex max-w-full shrink-0 items-center justify-center sm:mt-12 md:mt-14"
        >
          <div className="relative cursor-pointer overflow-hidden rounded-pill bg-white/20 ring-1 ring-white/40">
            <StripHoverBg />
            <span className="relative z-20 block rounded-pill px-5 py-3 text-center font-heading text-sm font-semibold leading-none text-white transition-colors duration-300 ease-in-out group-hover:text-pdfSurface sm:px-8 sm:py-3.5 sm:text-base md:px-10 md:py-4 md:text-lg lg:px-12 lg:py-[1rem]">
              {siteContent.momentsCta.label}
            </span>
          </div>
        </a>
        <nav
          aria-label="Sport collateral"
          className="mt-8 mx-auto grid w-full max-w-md grid-cols-2 justify-items-center gap-3 sm:mt-10 sm:gap-4 md:mt-12 md:flex md:max-w-full md:flex-wrap md:justify-center md:gap-5"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={`group inline-flex max-w-full shrink-0 items-center max-md:justify-center ${
                isLast
                  ? 'max-md:col-span-2 max-md:flex max-md:w-full max-md:justify-center'
                  : 'max-md:w-[92%]'
              }`}
            >
              {({ isActive }) => (
                <div
                  className={`relative cursor-pointer overflow-hidden rounded-pill ${
                    isLast
                      ? 'max-sm:w-[calc((100%-0.75rem)/2*0.92)] sm:max-md:w-[calc((100%-1rem)/2*0.92)]'
                      : 'max-md:w-full'
                  } ${isActive ? 'bg-white' : 'bg-white/10'}`}
                >
                  {!isActive ? <StripHoverBg /> : null}
                  <span
                    className={`relative z-20 block max-md:w-full rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem] ${
                      isActive
                        ? 'text-pdfSurface'
                        : 'text-white transition-colors duration-300 ease-in-out group-hover:text-pdfSurface'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
