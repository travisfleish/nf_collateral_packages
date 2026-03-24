import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heading, SectionShell, Text } from '@genius-sports/gs-marketing-ui'
import { setPageMeta } from '../app/seo'
import { siteContent } from '../content/site'

export function NotFoundPage() {
  useEffect(() => {
    setPageMeta({ title: `Page not found · ${siteContent.brand.name}` })
  }, [])

  return (
    <main className="flex flex-1 items-center bg-white py-24">
      <SectionShell width="narrow" className="text-center">
        <Heading level="h1">Page not found</Heading>
        <Text variant="lead" className="mt-4">
          The page you requested does not exist or has moved.
        </Text>
        <Link
          to={siteContent.brand.homePath}
          className="mt-8 inline-block font-heading text-base font-medium text-accent hover:text-accent-hover"
        >
          Back to home
        </Link>
      </SectionShell>
    </main>
  )
}
