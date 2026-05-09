/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06070b',
          900: '#0a0c12',
          800: '#11141c',
          700: '#1a1e29',
          600: '#252b3b',
          500: '#3a4256',
        },
        slate: {
          150: '#e6ebf2',
          250: '#cdd5e1',
          350: '#a3adbf',
          450: '#7d889c',
        },
        accent: {
          DEFAULT: '#7df9d4',
          glow: '#5af0c6',
          dim: '#2fa085',
        },
        violet: {
          glow: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Tamed from 12vw/11rem — was overflowing on 14"+ displays. New
        // values keep the hero striking but never spill out of the viewport.
        'mega': ['clamp(2.75rem, 7.5vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'huge': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      backgroundImage: {
        'grid': 'linear-gradient(rgba(125,249,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,249,212,0.05) 1px, transparent 1px)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
};
