import { NavLink } from 'react-router-dom'
import { GeniusStripHoverBg, Heading } from '@genius-sports/gs-marketing-ui'
import { siteContent } from '../../content/site'

export function CollateralHero() {
  const items = siteContent.collateralNav

  return (
    <section
      aria-labelledby="newfronts-hero-title"
      className="w-full shrink-0 border-b border-border bg-white"
    >
      <div className="container mx-auto flex flex-col items-center px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <Heading
          id="newfronts-hero-title"
          level="h1"
          className="max-w-4xl text-center"
        >
          Genius Sports NewFronts
        </Heading>
        <nav
          aria-label="Sport collateral"
          className="mt-8 flex max-w-full flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4 md:gap-5"
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
                  className={`relative cursor-pointer overflow-hidden rounded-pill bg-navy/5 ${
                    isActive ? 'ring-2 ring-accent ring-offset-2' : ''
                  }`}
                >
                  <GeniusStripHoverBg />
                  <span className="relative z-20 block rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none text-navy transition-colors duration-300 ease-in-out group-hover:text-white sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem]">
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
