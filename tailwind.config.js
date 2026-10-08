/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAF9F6',
          100: '#F4F2EC',
          200: '#EAE6DC',
          300: '#DCD6C8',
          400: '#C8BEAA',
          500: '#9E927C',
          800: '#2A2723',
          900: '#151412',
          950: '#0E0D0C',
        },
        paper: '#F8F7F4',
        ink: {
          DEFAULT: '#121212',
          muted: '#686661',
          light: '#9E9C96',
          faint: '#D4D1CA',
        },
        accent: {
          DEFAULT: '#BD532B', // Editorial terracotta / copper
          dark: '#9E3F1C',
          light: '#F4EAE4',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'mega-wide': '0.3em',
      }
    },
  },
  plugins: [],
}
