import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#43085f',
        paper: '#f4ddff',
        ink: '#140019',
        accent: '#77008a',
        accent2: '#a000ad',
        danger: '#c000ba',
        muted: '#9d82af',
        lime: '#d9b3ee',
        pink: '#c000ba',
        yellow: '#d14fe5',
        sky: '#b85fd8',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
