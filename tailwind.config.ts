import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#07090d',
        panel: '#0d1117',
        line: '#1b2430',
        accent: '#74f27c',
        electric: '#63d8ff',
      },
    },
  },
  plugins: [],
} satisfies Config
