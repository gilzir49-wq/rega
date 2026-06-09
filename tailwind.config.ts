import type { Config } from 'tailwindcss';

// Colors are wired to CSS custom properties (defined in globals.css) so the
// whole app flips between day and night by toggling a `.dark` class on <html>.
// Components just use `bg-surface text-ink` etc. and theme for free.
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        sage: {
          DEFAULT: 'var(--sage)',
          deep: 'var(--sage-deep)',
          soft: 'var(--sage-soft)',
        },
        sand: 'var(--sand)',
        clay: 'var(--clay)',
        sky: 'var(--sky)',
      },
      fontFamily: {
        sans: ['var(--font-app)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(60, 74, 66, 0.22)',
        card: '0 2px 16px -6px rgba(60, 74, 66, 0.16)',
        glow: '0 0 60px -10px rgba(126, 155, 130, 0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
