import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#080b14',
        panel: '#101625',
        line: '#243149',
        accent: '#a78bfa',
        electric: '#22d3ee',
      },
    },
  },
  plugins: [],
} satisfies Config
