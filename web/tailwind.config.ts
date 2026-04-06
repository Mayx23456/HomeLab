import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f7f1e1',
        surface: '#fff7e6',
        paper: '#fffdf5',
        ink: '#111111',
        accent: '#ff5b2e',
        accent2: '#2155ff',
        danger: '#ff3366',
        muted: '#655d52',
        lime: '#d6ff45',
        pink: '#ff7bd5',
        yellow: '#ffd84d',
        sky: '#7ed7ff',
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
