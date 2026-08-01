import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colours — verified from Neatedge logo
        brand: {
          navy: '#001F3F',
          gold: '#D4A574',
          midnight: '#0A3A6A',
          teal: '#00A8A8',
        },
        // Greys
        grey: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          light: '#F5F7FA',
          200: '#EEEFF2',
          300: '#E5E7EB',
          400: '#D1D5DB',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Status colours
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },
      },
      fontSize: {
        // Heading hierarchy
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        h6: ['14px', { lineHeight: '1.5', fontWeight: '600' }],
        // Body text scales
        'body-xl': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      spacing: {
        // 8px base unit system
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        sm: '4px',
        base: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        fast: '100ms',
        standard: '150ms',
        slow: '200ms',
        slower: '300ms',
      },
      screens: {
        xs: '375px',
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
