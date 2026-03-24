export type NavItem = {
  label: string
  /** When set, this top-level item shows the active blue underline on matching in-app routes. */
  activePathnames?: string[]
  href?: string
  children?: {
    label: string
    href: string
    description?: string
    children?: { label: string; href: string; description?: string }[]
  }[]
}

export type FooterColumn = {
  title: string
  links: { label: string; href: string }[]
}

export type SocialLink = {
  label: string
  href: string
}

export type PolicyLink = {
  label: string
  href: string
}

export const siteContent = {
  brand: {
    name: 'Your Company',
    homePath: '/' as const,
  },
  header: {
    nav: [
      {
        label: 'Products',
        children: [
          {
            label: 'Perform',
            href: 'https://www.geniussports.com/perform/',
            children: [
              { label: 'Performance Analysis', href: 'https://www.geniussports.com/perform/' },
              { label: 'AI Officiating', href: 'https://www.geniussports.com/perform/' },
              { label: 'League Software', href: 'https://www.geniussports.com/perform/' },
              { label: 'Integrity Services', href: 'https://www.geniussports.com/perform/' },
            ],
          },
          {
            label: 'Bet',
            href: 'https://www.geniussports.com/bet/',
            children: [
              { label: 'Data & Odds APIs', href: 'https://www.geniussports.com/bet/' },
              { label: 'Genius Trading Services', href: 'https://www.geniussports.com/bet/' },
              { label: 'BetVision', href: 'https://www.geniussports.com/bet/' },
            ],
          },
          {
            label: 'Engage',
            href: 'https://www.geniussports.com/engage/',
            children: [
              { label: 'FANHub', href: 'https://www.geniussports.com/engage/fanhub/' },
              { label: 'Augmentation', href: 'https://www.geniussports.com/engage/' },
              { label: 'Gamification', href: 'https://www.geniussports.com/engage/' },
              {
                label: 'Sports Data API',
                href: 'https://www.geniussports.com/engage/official-sports-data-api/',
              },
            ],
          },
        ],
      },
      {
        label: 'Solutions',
        children: [
          {
            label: 'For Sports Leagues',
            href: 'https://www.geniussports.com/sports-teams-leagues/',
            description: 'Transform the way you capture and use data. For every stakeholder.',
          },
          {
            label: 'For Brands',
            href: 'https://www.geniussports.com/brands/',
            description: 'Reach and engage sports fans efficiently. Beyond generic adtech.',
          },
          {
            label: 'For Sportsbooks',
            href: 'https://www.geniussports.com/sportsbooks/',
            description: 'Be more profitable. Outsource trading, risk and more to the experts.',
          },
          {
            label: 'For Content Owners',
            href: 'https://www.geniussports.com/content-owners/',
            description:
              'Transform your broadcast, stream or highlight reel, and reimagine viewing experiences.',
          },
        ],
      },
      {
        label: 'GeniusIQ',
        href: 'https://www.geniussports.com/geniusiq/',
      },
      {
        label: 'Customers',
        href: 'https://www.geniussports.com/customer-stories/',
      },
      {
        label: 'Learn',
        activePathnames: ['/learn'],
        children: [
          {
            label: 'Content Hub',
            href: 'https://www.geniussports.com/content-hub/',
            description:
              'Head to our resources centre for the latest events, blog articles and webinars.',
          },
          {
            label: 'Newsroom',
            href: 'https://www.geniussports.com/newsroom/',
            description:
              'From the back page to the front page. See the latest press releases and Genius news.',
          },
        ],
      },
    ] satisfies NavItem[],
    cta: {
      label: 'Get started',
      href: 'https://example.com',
      external: true as const,
    },
  },
  footer: {
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Perform', href: 'https://www.geniussports.com/perform/' },
          { label: 'Engage', href: 'https://www.geniussports.com/engage/' },
          { label: 'Bet', href: 'https://www.geniussports.com/bet/' },
          { label: 'GeniusIQ', href: 'https://www.geniussports.com/geniusiq/' },
          { label: 'Data Capture', href: 'https://www.geniussports.com/data-capture/' },
          {
            label: 'Sports Data API',
            href: 'https://www.geniussports.com/engage/official-sports-data-api/',
          },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Teams & Leagues', href: 'https://www.geniussports.com/sports-teams-leagues/' },
          { label: 'Sportsbooks', href: 'https://www.geniussports.com/sportsbooks/' },
          { label: 'Brands', href: 'https://www.geniussports.com/brands/' },
          { label: 'Content Owners', href: 'https://www.geniussports.com/content-owners/' },
          { label: 'Customers', href: 'https://www.geniussports.com/customer-stories/' },
        ],
      },
      {
        title: 'Learn',
        links: [
          { label: 'Content Hub', href: 'https://www.geniussports.com/content-hub/' },
          { label: 'Newsroom', href: 'https://www.geniussports.com/newsroom/' },
          { label: 'Podcast', href: 'https://www.geniussports.com/the-fan-engagement-podcast/' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: 'https://www.geniussports.com/about-us/' },
          { label: 'Careers', href: 'https://www.geniussports.com/careers/' },
          { label: 'Contact', href: 'https://www.geniussports.com/contact/' },
          { label: 'For Investors', href: 'https://investors.geniussports.com/' },
          {
            label: 'Modern Slavery Transparency Statement 2024-2025',
            href: 'https://www.geniussports.com/wp-content/uploads/2025/08/Modern-Slavery-Statement-2024-2025-Final.pdf',
          },
          { label: 'Legal', href: 'https://www.geniussports.com/legal/' },
        ],
      },
    ] satisfies FooterColumn[],
    social: [
      { label: 'X', href: 'https://x.com/geniussports' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/geniussports/' },
      { label: 'Facebook', href: 'https://www.facebook.com/GeniusSports' },
      { label: 'YouTube', href: 'https://www.youtube.com/channel/UCs30f29MkDPs7rnY12r2GSA' },
    ] satisfies SocialLink[],
    policyLinks: [
      { label: 'Policies', href: 'https://www.geniussports.com/policies/' },
      { label: 'Privacy Policy', href: 'https://www.geniussports.com/policies/privacy-policy/' },
      { label: 'Cookie Policy', href: 'https://www.geniussports.com/policies/cookie-policy/' },
      { label: 'Do Not Sell or Share My Information', href: 'https://www.geniussports.com/privacy-choices/' },
    ] satisfies PolicyLink[],
    copyright: `© ${new Date().getFullYear()} Genius Sports Group. All rights reserved.`,
  },
  home: {
    meta: {
      title: 'Home · Your Company',
      description:
        'Starter layout for single-page marketing sites built with the shared @genius-sports/gs-marketing-ui package.',
    },
    hero: {
      eyebrow: 'Marketing starter',
      title: 'Launch campaign pages with a consistent shell',
      description:
        'This page composes shared primitives—layout, typography, buttons, and cards—with small local helpers for heroes and section intros. Replace copy and routes for your next site.',
    },
    intro: {
      eyebrow: 'Pattern',
      title: 'Compose, do not fork the design system',
      description:
        'Keep tokens, Tailwind preset, and UI primitives in the shared package. This app only wires routing, SEO helpers, and reusable section shells.',
      align: 'center' as const,
    },
    featureCards: {
      eyebrow: 'Building blocks',
      title: 'Three placeholder pillars',
      description: 'Swap these cards for product-specific value props on a real campaign.',
      items: [
        {
          title: 'Fast setup',
          body: 'Clone the starter, point at the published UI package, and start composing sections.',
        },
        {
          title: 'Shared look and feel',
          body: 'Typography, color, and motion stay aligned because they live in one dependency.',
        },
        {
          title: 'Room to grow',
          body: 'Add providers, analytics, or CMS data in app code without touching the package.',
        },
      ],
    },
  },
}
