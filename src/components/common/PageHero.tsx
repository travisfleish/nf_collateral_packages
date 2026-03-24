import type { ReactNode } from 'react'
import { Heading, SectionShell, Text } from '@genius-sports/gs-marketing-ui'

export type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  align = 'left',
  primaryAction,
  secondaryAction,
}: PageHeroProps) {
  const isCenter = align === 'center'
  return (
    <section className="border-b border-border bg-gs-surface/40 py-16 md:py-24">
      <SectionShell
        width="wide"
        className={
          isCenter
            ? 'flex flex-col items-center text-center'
            : 'flex max-w-container-default flex-col'
        }
      >
        {eyebrow ? (
          <p className={isCenter ? 'hero-kicker' : 'hero-kicker self-start'}>{eyebrow}</p>
        ) : null}
        <Heading level="h1" className={isCenter ? 'max-w-4xl' : undefined}>
          {title}
        </Heading>
        {description ? (
          <Text variant="leadLg" className={isCenter ? 'mt-6 max-w-2xl' : 'mt-6 max-w-xl'}>
            {description}
          </Text>
        ) : null}
        {(primaryAction ?? secondaryAction) ? (
          <div
            className={
              isCenter
                ? 'mt-8 flex flex-wrap items-center justify-center gap-4'
                : 'mt-8 flex flex-wrap items-center gap-4'
            }
          >
            {primaryAction}
            {secondaryAction}
          </div>
        ) : null}
      </SectionShell>
    </section>
  )
}
