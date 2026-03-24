import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Heading, SectionShell, Text } from '@genius-sports/gs-marketing-ui'
import { setPageMeta } from '../app/seo'
import { PageHero } from '../components/common/PageHero'
import { SectionIntro } from '../components/common/SectionIntro'
import { siteContent } from '../content/site'
import { SITE_HEADER_MAIN_OFFSET_CLASS } from '../components/navigation/SiteHeader'

export function HomePage() {
  const navigate = useNavigate()
  const { home } = siteContent

  useEffect(() => {
    setPageMeta(home.meta)
  }, [home.meta])

  return (
    <main className={`flex-1 ${SITE_HEADER_MAIN_OFFSET_CLASS}`}>
      <PageHero
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        description={home.hero.description}
        primaryAction={
          <Button
            type="button"
            variant="primaryPill"
            onClick={() => {
              void navigate({ pathname: '/', hash: 'solutions' })
              document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Primary action
          </Button>
        }
      />

      <section id="solutions" className="py-16 md:py-24">
        <SectionIntro
          eyebrow={home.intro.eyebrow}
          title={home.intro.title}
          description={home.intro.description}
          align={home.intro.align}
        />
        <SectionShell width="wide" className="mt-14">
          <div className="mb-10 text-center">
            <Text variant="bodySm" className="font-heading uppercase tracking-wide text-muted">
              {home.featureCards.eyebrow}
            </Text>
            <Heading level="h3" className="mt-2">
              {home.featureCards.title}
            </Heading>
            <Text variant="lead" className="mx-auto mt-4 max-w-2xl">
              {home.featureCards.description}
            </Text>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.featureCards.items.map((item) => (
              <Card key={item.title} variant="feature" className="p-6 md:p-8">
                <Heading level="h4">{item.title}</Heading>
                <Text variant="body" className="mt-3">
                  {item.body}
                </Text>
              </Card>
            ))}
          </div>
        </SectionShell>
      </section>
    </main>
  )
}
