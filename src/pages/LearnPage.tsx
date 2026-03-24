import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heading, Text } from '@genius-sports/gs-marketing-ui'
import { setPageMeta } from '../app/seo'
import { SITE_HEADER_MAIN_OFFSET_CLASS } from '../components/navigation/SiteHeader'

const meta = {
  title: 'Learn · Marketing starter',
  description: 'Example internal route to demonstrate header active state for Learn.',
}

export function LearnPage() {
  useEffect(() => {
    setPageMeta(meta)
  }, [])

  return (
    <main className={`flex-1 ${SITE_HEADER_MAIN_OFFSET_CLASS}`}>
      <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
        <Heading level="h1" className="mb-4">
          Learn
        </Heading>
        <Text className="mb-8 text-navy/75">
          This page exists so the header can show the blue active underline on &quot;Learn&quot; when{' '}
          <code className="rounded bg-navy/5 px-1 py-0.5 text-sm">activePathnames</code> includes{' '}
          <code className="rounded bg-navy/5 px-1 py-0.5 text-sm">/learn</code>.
        </Text>
        <Link to="/" className="text-navy underline underline-offset-4 transition-colors hover:text-navy/70">
          Back to home
        </Link>
      </div>
    </main>
  )
}
