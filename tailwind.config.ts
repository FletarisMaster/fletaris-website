import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  // Preflight is disabled: /air ports the original hand-rolled CSS verbatim and must
  // not be touched by Tailwind's base reset. globals.css carries the minimal reset
  // the new hub actually needs instead.
  corePlugins: {
    preflight: false,
  },
  theme: {
    // §10's exact breakpoints — 720/940/1140 — replacing Tailwind's defaults
    // (640/768/1024) entirely, so sm:/md:/lg: mean what the spec says they mean.
    screens: {
      sm: '720px',
      md: '940px',
      lg: '1140px',
    },
    extend: {
      colors: {
        brand: {
          navy: '#1E2D4A',
          'navy-alt': '#26384A',
          teal: '#00C4CC',
          'teal-light': '#ADFFE4',
          black: '#020202',
          white: '#FFFFFF',
        },
        // Dark scale for the public site: the brand's dark-mode tokens (navy-biased, not neutral
        // grey), shared by the hub and /air. Teal stays the only accent hue. (F36 D7)
        hub: {
          base: '#0B1120', // brand dark base
          raised: '#111827', // brand dark page
          card: '#1C2638', // brand dark card
          line: '#2D3F5C', // brand dark border
          grid: '#152032', // brand dark header: background grid lines
          ring: '#26384A', // brand navy-alt: atom orbit rings
          dim: '#7D8BA3', // small mono labels; 5.4:1 on base (was #5C626C, 3.2:1)
        },
        surface: {
          page: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#94A3B8',
        },
        text: {
          primary: '#020202',
          secondary: '#64748B',
          'on-dark': '#F1F5F9', // brand dark text primary
          'on-dark-dim': '#94A3B8', // brand dark text secondary
        },
        status: {
          green: '#22C55E',
          amber: '#F59E0B',
          red: '#EF4444',
          purple: '#8B5CF6',
          gray: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1440px',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
