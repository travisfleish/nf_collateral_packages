import type { ReactNode } from 'react'
import { Chip, Heading, SectionShell, Text } from '@genius-sports/gs-marketing-ui'

export type SectionIntroProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  /** Extra content below the description (e.g. actions). */
  children?: ReactNode
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
  children,
}: SectionIntroProps) {
  const isCenter = align === 'center'
  return (
    <SectionShell
      width="default"
      className={
        isCenter
          ? 'flex flex-col items-center text-center'
          : 'flex max-w-container-narrow flex-col'
      }
    >
      {eyebrow ? (
        <Chip className={isCenter ? 'mb-4' : 'mb-4 self-start'}>{eyebrow}</Chip>
      ) : null}
      <Heading level="h2" className={isCenter ? 'max-w-3xl' : undefined}>
        {title}
      </Heading>
      {description ? (
        <Text variant="lead" className={isCenter ? 'mt-4 max-w-2xl' : 'mt-4'}>
          {description}
        </Text>
      ) : null}
      {children}
    </SectionShell>
  )
}
