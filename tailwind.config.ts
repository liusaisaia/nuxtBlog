import type { Config } from 'tailwindcss'
import svgToDataUri from 'mini-svg-data-uri'
// @ts-ignore
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        // Figma Design System - Dark Purple Theme (default)
        background: {
          primary: '#15121A',
          secondary: '#100D15',
        },
        border: {
          DEFAULT: 'rgba(73, 68, 85, 0.15)',
          hover: 'rgba(73, 68, 85, 0.3)',
        },
        accent: {
          purple: '#6F45E3',
          'purple-light': 'rgba(111, 69, 227, 0.1)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.6)',
          muted: 'rgba(255, 255, 255, 0.4)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
        'accent-gradient': 'linear-gradient(177deg, rgba(111, 69, 227, 1) 0%, rgba(44, 40, 49, 1) 100%)',
        'hero-decoration': 'linear-gradient(237deg, rgba(205, 189, 255, 0.05) 0%, rgba(205, 189, 255, 0) 100%)',
      },
      boxShadow: {
        'header': '0px 20px 40px 0px rgba(8, 6, 13, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'header': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
      maxWidth: {
        'page': '1280px',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme, addVariant }: any) {
      // Support `light:` utilities controlled by html:not(.dark)
      addVariant('light', 'html:not(.dark) &')

      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      )
    },
  ],
}
