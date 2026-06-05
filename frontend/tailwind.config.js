/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF8F3',
          100: '#FBF1E8',
          200: '#F5DCC9',
          300: '#EFC7AB',
          400: '#E8A86E',
          500: '#D4A574', // Main brand color (Warm Gold/Copper)
          600: '#C69565',
          700: '#A87346',
          800: '#8A5D38',
          900: '#6D462B',
        },
        secondary: {
          50: '#F1F3F1',
          100: '#E3E7E3',
          200: '#C7CFC7',
          300: '#ABB7AB',
          400: '#6F7F6F',
          500: '#2C3E2F', // Deep Forest Green
          600: '#28382B',
          700: '#1F2A20',
          800: '#161B16',
          900: '#0D0E0D',
        },
        accent: {
          50: '#FFFAF7',
          100: '#FEF5F0',
          200: '#FCEAE0',
          300: '#F9DFD0',
          400: '#F3C9B1',
          500: '#E8D4C4', // Light Beige
          600: '#DFC9B8',
          700: '#D4B9A8',
          800: '#C9A998',
          900: '#BE9988',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '48px' }],
        '6xl': ['60px', { lineHeight: '60px' }],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'gold': '0 10px 25px -5px rgba(212, 165, 116, 0.2)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  safelist: [
    // Add any dynamic classes here to prevent purging
    'text-primary-500',
    'bg-secondary-500',
    'border-accent-300',
  ],
};
