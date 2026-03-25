import { NavLink } from 'react-router-dom'
import { Heading } from '@genius-sports/gs-marketing-ui'
import { siteContent } from '../../content/site'
import { StripHoverBg } from './StripHoverBg'

export function CollateralHero() {
  const items = siteContent.collateralNav

  return (
    <section
      aria-labelledby="newfronts-hero-title"
      className="w-full shrink-0 bg-[#060a37] text-white"
    >
      <div className="container mx-auto flex flex-col items-center px-4 pb-8 pt-20 md:px-6 md:pb-10 md:pt-24 lg:pb-12 lg:pt-28">
        <Heading
          id="newfronts-hero-title"
          level="h1"
          className="max-w-4xl text-center !text-white"
        >
          Genius Sports NewFront
        </Heading>
        <nav
          aria-label="Sport collateral"
          className="mt-10 flex max-w-full flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4 md:mt-14 md:gap-5"
        >
          {items.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className="group inline-flex max-w-full shrink-0 items-center"
            >
              {({ isActive }) => (
                <div
                  className={`relative cursor-pointer overflow-hidden rounded-pill ${
                    isActive ? 'bg-white' : 'bg-white/10'
                  }`}
                >
                  {!isActive ? <StripHoverBg /> : null}
                  <span
                    className={`relative z-20 block rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem] ${
                      isActive
                        ? 'text-[#060a37]'
                        : 'text-white transition-colors duration-300 ease-in-out group-hover:text-[#060a37]'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  )
}
