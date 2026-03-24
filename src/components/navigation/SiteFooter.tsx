import { SectionShell, Text } from '@genius-sports/gs-marketing-ui'
import { siteContent } from '../../content/site'

const footerLinkTypography = {
  fontFamily:
    'ESKlarheitKurrentTRIAL, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeight: 350,
  fontSize: '17px',
  lineHeight: 1.2,
  letterSpacing: '-0.010625em',
  fontSynthesis: 'none',
} as const

const footerColumnHeaderTypography = {
  fontFamily:
    'ESKlarheitKurrentTRIAL, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '18.2px',
  letterSpacing: '-0.13125px',
  color: 'rgba(13, 18, 38, 0.7)',
  margin: '0 0 40px',
  fontSynthesis: 'none',
} as const

const footerPolicyLinkTypography = {
  fontFamily:
    'ESKlarheitKurrentTRIAL, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  fontSize: '13.6772px',
  lineHeight: '19.832px',
  letterSpacing: '-0.128224px',
  color: 'rgba(13, 18, 42, 0.706)',
  fontFeatureSettings: 'normal',
  fontVariationSettings: 'normal',
  textDecoration: 'none',
  WebkitFontSmoothing: 'antialiased',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
} as const

const socialIconPaths: Record<string, string> = {
  X: 'M18.244 2H21l-6.56 7.495L22 22h-6.828l-5.346-6.99L3.7 22H1l7.03-8.036L0 2h6.999l4.832 6.38L18.244 2Zm-1.197 18h1.889L5.973 3.895H3.947L17.047 20Z',
  LinkedIn:
    'M4.983 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.983 0ZM.5 8h4.9v15h-4.9V8Zm7.5 0h4.696v2.05h.067c.654-1.24 2.252-2.55 4.636-2.55 4.957 0 5.871 3.263 5.871 7.507V23h-4.9v-7.071c0-1.687-.03-3.857-2.35-3.857-2.353 0-2.714 1.838-2.714 3.736V23H8V8Z',
  Facebook:
    'M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.49-1.46H16.7V4.96c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.2 1.53-4.2 4.34V11H7.2v3h2.77v8h3.53Z',
  YouTube:
    'M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.5 12 4.5 12 4.5s-7.6 0-9.4.6a3 3 0 0 0-2.1 2.1A31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-4.8ZM9.6 15.9V8.1L16.2 12l-6.6 3.9Z',
}

export function SiteFooter() {
  const { footer } = siteContent

  return (
    <footer className="mt-auto py-12 md:py-16">
      <SectionShell width="wide" className="flex flex-col gap-10 md:gap-12">
        <div className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-5 lg:gap-x-14">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="block" style={footerColumnHeaderTypography}>
                {col.title}
              </h3>
              <ul className="space-y-5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-navy transition-colors duration-300 ease-in-out hover:text-blue"
                      style={footerLinkTypography}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-1 lg:justify-self-end">
            <ul className="flex items-center gap-3 text-foreground/70 lg:justify-end">
              {footer.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[#f3f5f8] text-[#0d1226] transition-colors duration-300 ease-in-out hover:bg-[#0d1226] hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d={socialIconPaths[social.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <Text variant="bodySm" className="text-sm text-muted">
            {footer.copyright}
          </Text>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            {footer.policyLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 ease-in-out hover:text-blue"
                style={footerPolicyLinkTypography}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </SectionShell>
    </footer>
  )
}
