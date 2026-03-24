import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GeniusStripHoverBg } from '@genius-sports/gs-marketing-ui'
import geniusLogoUrl from '@genius-sports/gs-marketing-ui/assets/logos/genius_logo.svg?url'
import { siteContent, type NavItem } from '../../content/site'

function navItemMatchesPath(item: NavItem, pathname: string): boolean {
  if (!item.activePathnames?.length) return false
  return item.activePathnames.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
}

const SCROLLED_HEADER_THRESHOLD = 60

/** Matches the fixed header inner bar (`h-*` row); keep in sync with the header container classes below. */
export const SITE_HEADER_MAIN_OFFSET_CLASS = 'pt-20'

type DropdownSection = {
  label: string
  href?: string
  description?: string
  children?: {
    label: string
    href: string
    description?: string
  }[]
}

function SectionHeader({
  label,
  href,
  onClick,
  labelClassName,
  showIcon = true,
}: {
  label: string
  href?: string
  onClick?: () => void
  labelClassName?: string
  showIcon?: boolean
}) {
  const content = (
    <>
      <span className={labelClassName ?? 'header-nav-link-font'}>{label}</span>
      {showIcon ? (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[0.65rem] leading-none">
          ↗
        </span>
      ) : null}
    </>
  )

  if (!href) {
    return (
      <div className={showIcon ? 'inline-flex items-center gap-2 text-navy' : 'inline-flex text-navy'}>
        {content}
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        showIcon
          ? 'inline-flex items-center gap-2 text-navy transition-colors hover:text-navy/75'
          : 'inline-flex text-navy transition-colors hover:text-navy/75'
      }
      onClick={onClick}
    >
      {content}
    </a>
  )
}

function ProductsDropdownPanel({
  children,
  onLinkClick,
}: {
  children: DropdownSection[]
  onLinkClick?: () => void
}) {
  const perform = children.find((section) => section.label === 'Perform')
  const bet = children.find((section) => section.label === 'Bet')
  const engage = children.find((section) => section.label === 'Engage')
  const leftColumn = [perform, bet].filter(Boolean) as DropdownSection[]
  const rightColumn = [engage].filter(Boolean) as DropdownSection[]

  const renderSectionGroup = (section: DropdownSection, addBottomMargin: boolean) => (
    <div key={section.label} className={addBottomMargin ? 'mb-6' : ''}>
      <SectionHeader
        label={section.label}
        href={section.href}
        onClick={onLinkClick}
        labelClassName="header-dropdown-section-title-font"
        showIcon={false}
      />
      {section.children?.length ? (
        <ul className="mt-2 flex flex-col space-y-2 text-left">
          {section.children.map((subLink) => (
            <li key={subLink.label} className="w-full text-left">
              <a
                href={subLink.href}
                target="_blank"
                rel="noreferrer"
                className="header-nav-link-font block w-full text-left text-navy/75 transition-colors hover:text-navy"
                onClick={onLinkClick}
              >
                {subLink.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )

  return (
    <div className="flex flex-row items-start gap-x-24">
      <div className="flex flex-col items-start text-left">
        {leftColumn.map((section, index) => renderSectionGroup(section, index < leftColumn.length - 1))}
      </div>
      <div className="flex flex-col items-start text-left">
        {rightColumn.map((section, index) => renderSectionGroup(section, index < rightColumn.length - 1))}
      </div>
    </div>
  )
}

const SOLUTIONS_FEATURE_CARD = {
  href: 'https://www.geniussports.com/customer-stories/fiba-u19-world-cup/',
  imageSrc: '/FIBA.avif',
  logoSrc:
    'https://cms.geniussports.com/wp-content/uploads/2025/08/International_Basketball_Federation_logo.svg.png',
  caption: 'FIBA U19 World Cup showcases AI innovation with GeniusIQ',
} as const

function SolutionsFeatureCard({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="ml-auto w-full space-y-4 lg:max-w-[29.5rem] lg:space-y-6">
      <a
        href={SOLUTIONS_FEATURE_CARD.href}
        target="_blank"
        rel="noreferrer"
        onClick={onLinkClick}
        className="group relative flex overflow-hidden rounded-[0.375rem] bg-green p-4 lg:p-5"
      >
        <div className="relative z-10 flex h-full min-h-[9.5625rem] w-full flex-col lg:min-h-[14rem]">
          <div className="mb-12 flex h-8 w-[5rem] shrink-0 items-center">
            <img
              src={SOLUTIONS_FEATURE_CARD.logoSrc}
              alt="International Basketball Federation logo"
              loading="lazy"
              width={1200}
              height={589}
              decoding="async"
              className="h-full w-full object-contain object-left transition-opacity duration-200"
            />
          </div>
          <span className="text-lead-lg mt-auto inline-flex font-heading font-medium tracking-[-0.0125em] text-white">
            {SOLUTIONS_FEATURE_CARD.caption}
          </span>
          <div
            className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-0 group-hover:scale-100 lg:rotate-45 lg:scale-0"
            aria-hidden
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.82912 7.55857L12.4409 7.55857M12.4409 7.55857L12.4409 12.1704M12.4409 7.55857L7.55786 12.4417"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black" aria-hidden />
        <img
          src={SOLUTIONS_FEATURE_CARD.imageSrc}
          alt="FIBA"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-200"
        />
      </a>
    </div>
  )
}

function SolutionsDropdownPanel({
  children,
  onLinkClick,
}: {
  children: DropdownSection[]
  onLinkClick?: () => void
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
      <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-16 gap-y-8">
        {children.map((section) => (
          <div key={section.label} className="flex flex-col items-start text-left">
            <SectionHeader
              label={section.label}
              href={section.href}
              onClick={onLinkClick}
              labelClassName="header-dropdown-section-title-font"
              showIcon={false}
            />
            {section.description ? (
              <p className="mt-3 text-base font-normal leading-relaxed text-navy/75">{section.description}</p>
            ) : null}
          </div>
        ))}
      </div>
      <SolutionsFeatureCard onLinkClick={onLinkClick} />
    </div>
  )
}

/** Vertical offsets (%) for the SAOT card equalizer — aligned to geniussports.com Learn menu */
const SAOT_EQUALIZER_OFFSETS_PCT = [
  10, 30, 0, 30, 5, 30, 5, 10, 0, 5, 0, 30, 0, 10, 30, 10, 30, 0, 10, 5, 0, 0, 10, 5, 0, 5, 0, 0, 10, 0, 5, 10, 0, 5,
  10, 30, 5, 30, 30, 5, 0, 0, 30, 30, 5, 5, 0, 10,
] as const

const LEARN_SAOT_CARD = {
  href: 'https://www.geniussports.com/perform/saot/',
  imageSrc: '/SAOT.avif',
  title: 'SAOT – Semi-Automated Offside Technology',
  body: 'SAOT brings back the joy of the beautiful game to fans with instant, accurate decision making.',
} as const

function LearnSaotFeatureCard({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <div className="w-full shrink-0 lg:w-[38%] lg:max-w-[30.9375rem]">
      <a
        href={LEARN_SAOT_CARD.href}
        target="_blank"
        rel="noreferrer"
        onClick={onLinkClick}
        className="group relative flex flex-col overflow-hidden rounded-lg bg-brightGreen p-4 text-navy transition-colors duration-200 hover:bg-brightGreen hover:text-navy md:h-full md:grow md:bg-purple md:text-white"
      >
        <div className="relative mb-4 flex h-[3.5rem] w-[3.5rem] items-center invert transition-colors duration-200 group-hover:invert md:mb-6 md:h-[4.375rem] md:w-[4.375rem] md:invert-0">
          <img
            src={LEARN_SAOT_CARD.imageSrc}
            alt="SAOT"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>

        <div
          className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1] md:right-6 md:top-6 lg:rotate-45 lg:scale-0"
          aria-hidden
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.82912 7.55857L12.4409 7.55857M12.4409 7.55857L12.4409 12.1704M12.4409 7.55857L7.55786 12.4417"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mb-6 max-w-[19.875rem]">
          <span className="mb-1 block font-heading text-xl font-medium tracking-[-0.0125em] lg:mb-2">
            {LEARN_SAOT_CARD.title}
          </span>
          <p className="font-body text-[15px] leading-[1.4] tracking-[-0.009375em] opacity-80">
            {LEARN_SAOT_CARD.body}
          </p>
        </div>

        <div className="mt-auto flex h-[2.75rem] w-full items-end justify-between overflow-hidden">
          {SAOT_EQUALIZER_OFFSETS_PCT.map((pct, i) => (
            <div
              key={i}
              className="flex h-full flex-col items-center transition-transform duration-300"
              style={{ transform: `translateY(${pct}%)` }}
            >
              <div className="h-[0.5rem] w-[0.0625rem] shrink-0 bg-purple transition-all duration-200 group-hover:bg-purple md:bg-brightGreen" />
              <div className="h-full w-[0.2rem] bg-purple transition-all duration-200 group-hover:bg-purple md:bg-brightGreen" />
            </div>
          ))}
        </div>
      </a>
    </div>
  )
}

function LearnDropdownPanel({
  children,
  onLinkClick,
}: {
  children: DropdownSection[]
  onLinkClick?: () => void
}) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-14">
      <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-16 gap-y-8">
        {children.map((section) => (
          <div key={section.label} className="flex flex-col items-start text-left">
            <SectionHeader
              label={section.label}
              href={section.href}
              onClick={onLinkClick}
              labelClassName="header-dropdown-section-title-font"
              showIcon={false}
            />
            {section.description ? (
              <p className="mt-3 text-base font-normal leading-relaxed text-navy/75">{section.description}</p>
            ) : null}
          </div>
        ))}
      </div>
      <LearnSaotFeatureCard onLinkClick={onLinkClick} />
    </div>
  )
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedMobileSections, setExpandedMobileSections] = useState<Record<string, boolean>>({})
  const navItems = siteContent.header.nav
  const activeDropdownItem = navItems.find((item) => item.label === openDesktopDropdown && item.children?.length)

  const highlightedNavLabel = useMemo(() => {
    const routeMatch = navItems.find((item) => navItemMatchesPath(item, pathname))?.label
    return routeMatch ?? openDesktopDropdown
  }, [navItems, pathname, openDesktopDropdown])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLLED_HEADER_THRESHOLD)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      setExpandedMobileSections({})
    } else {
      setOpenDesktopDropdown(null)
    }
  }, [mobileMenuOpen])

  const toggleMobileSection = (label: string) => {
    setExpandedMobileSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md'
          : 'bg-white backdrop-blur-0'
      }`}
    >
      <div className="relative" onMouseLeave={() => setOpenDesktopDropdown(null)}>
        <div className={openDesktopDropdown ? 'w-full border-b border-border' : 'w-full'}>
          {/* No bottom padding: keeps nav underlines flush with the full-width border (reference). */}
          <div className="container mx-auto flex items-center gap-4 py-2 md:items-stretch md:py-0 md:pt-2">
          <a
            href="https://www.geniussports.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Genius Sports"
            className="flex min-w-0 flex-shrink-0 items-center"
          >
            <img src={geniusLogoUrl} alt="Genius Sports" className="h-24 w-auto object-contain object-left" />
          </a>

          <nav className="hidden items-stretch gap-8 md:ml-4 md:flex lg:gap-11">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children?.length)
              const isOpen = openDesktopDropdown === item.label
              const isHighlighted = highlightedNavLabel === item.label
              const itemHref = item.href ?? '#'
              /** Token: `--color-accent` / `--color-genius-blue` (#0011e1) via Tailwind `accent` in gs-marketing-ui preset */
              const activeBar = (
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 z-[1] h-[3px] ${
                    /* -bottom-px: overlap the 1px border so blue sits flush on the rule (reference). */
                    isHighlighted ? '-bottom-px bg-accent' : 'bottom-0 bg-transparent'
                  }`}
                />
              )

              return (
                <div
                  key={item.label}
                  className="relative flex h-full min-h-0"
                  onMouseEnter={() => hasChildren && setOpenDesktopDropdown(item.label)}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      className="relative flex h-full w-full min-w-0 items-center gap-1.5 border-0 bg-transparent px-0 py-0 text-navy transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="header-nav-link-font">{item.label}</span>
                      {activeBar}
                    </button>
                  ) : (
                    <a
                      href={itemHref}
                      target="_blank"
                      rel="noreferrer"
                      className="header-nav-link-font relative flex h-full items-center text-navy transition-colors hover:text-navy/70"
                    >
                      {item.label}
                      {activeBar}
                    </a>
                  )}
                </div>
              )
            })}
          </nav>

          <a
            href="https://www.geniussports.com"
            target="_blank"
            rel="noreferrer"
            className="group ml-auto hidden max-w-[20.9375rem] flex-shrink-0 items-center md:inline-flex"
          >
            <div className="relative cursor-pointer overflow-hidden rounded-pill bg-navy/5">
              <GeniusStripHoverBg />
              <span className="relative z-20 block rounded-pill px-4 py-2.5 text-center font-heading text-xs font-medium leading-none text-navy transition-colors duration-300 ease-in-out group-hover:text-white sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3.5 lg:px-5 lg:py-[0.8rem] lg:text-[1rem]">
                Visit Genius Sports
              </span>
            </div>
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center text-navy md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileMenuOpen ? (
              <span className="text-2xl leading-none">✕</span>
            ) : (
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-6 rounded bg-navy" />
                <span className="block h-0.5 w-6 rounded bg-navy" />
                <span className="block h-0.5 w-6 rounded bg-navy" />
              </span>
            )}
          </button>
          </div>
        </div>

        <AnimatePresence>
          {activeDropdownItem ? (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full z-30 bg-white shadow-[0_14px_28px_rgba(7,11,21,0.12)]"
            >
              <div className="container mx-auto py-8 lg:py-12">
                {activeDropdownItem.label === 'Products' ? (
                  <ProductsDropdownPanel children={activeDropdownItem.children as DropdownSection[]} />
                ) : null}
                {activeDropdownItem.label === 'Solutions' ? (
                  <SolutionsDropdownPanel children={activeDropdownItem.children as DropdownSection[]} />
                ) : null}
                {activeDropdownItem.label === 'Learn' ? (
                  <LearnDropdownPanel children={activeDropdownItem.children as DropdownSection[]} />
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-white md:hidden"
          >
            <div className="px-4 pb-10 pt-6 sm:px-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const hasChildren = Boolean(item.children?.length)
                  const isExpanded = Boolean(expandedMobileSections[item.label])
                  const itemHref = item.href ?? '#'

                  if (!hasChildren) {
                    return (
                      <a
                        key={item.label}
                        href={itemHref}
                        target="_blank"
                        rel="noreferrer"
                        className="header-nav-link-font block rounded-md px-3 py-3 text-navy transition-colors hover:bg-navy/5"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    )
                  }

                  return (
                    <div key={item.label} className="rounded-md">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-navy transition-colors hover:bg-navy/5"
                        onClick={() => toggleMobileSection(item.label)}
                        aria-expanded={isExpanded}
                      >
                        <span className="header-nav-link-font">{item.label}</span>
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 12 12"
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        >
                          <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="mb-1 mt-1 space-y-4 pl-6 pr-3">
                              {item.children?.map((child) => {
                                if ('children' in child && child.children && child.children.length > 0) {
                                  return (
                                    <div key={child.label}>
                                      <a
                                        href={child.href ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 text-navy transition-colors hover:text-navy/75"
                                        onClick={closeMobileMenu}
                                      >
                                        <span className="header-nav-link-font">{child.label}</span>
                                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-[0.6rem] leading-none">
                                          ↗
                                        </span>
                                      </a>
                                      <div className="mt-2 space-y-2">
                                        {child.children.map((subChild) => (
                                          <a
                                            key={subChild.label}
                                            href={subChild.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="header-nav-link-font block text-navy/75 transition-colors hover:text-navy"
                                            onClick={closeMobileMenu}
                                          >
                                            {subChild.label}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                }

                                return (
                                  <a
                                    key={child.label}
                                    href={child.href ?? '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block rounded-md py-1 text-navy transition-colors hover:text-navy/75"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="inline-flex items-center gap-2">
                                      <span className="header-nav-link-font">{child.label}</span>
                                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-[0.6rem] leading-none">
                                        ↗
                                      </span>
                                    </span>
                                    {'description' in child && child.description ? (
                                      <span className="mt-1 block font-normal leading-relaxed text-navy/75">
                                        {child.description}
                                      </span>
                                    ) : null}
                                  </a>
                                )
                              })}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
