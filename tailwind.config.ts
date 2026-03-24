import type { Config } from 'tailwindcss'
import gsMarketingUiPreset from '@genius-sports/gs-marketing-ui/tailwind-preset'

const config: Config = {
  presets: [gsMarketingUiPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@genius-sports/gs-marketing-ui/dist/**/*.{js,mjs}',
    '../../gs-marketing-ui/gs-marketing-ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#17b26a',
        /** Deep card purple (Learn mega-menu SAOT tile); matches geniussports.com tokens */
        purple: '#2d0a4a',
        /** Lime accent / hover state for SAOT featured card */
        brightGreen: '#d4ff3c',
      },
    },
  },
  plugins: [],
}

export default config