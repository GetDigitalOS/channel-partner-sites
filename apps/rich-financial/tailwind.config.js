const sharedConfig = require('@channel-partner-sites/shared/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/shared/components/**/*.{ts,tsx}',
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      ...sharedConfig.theme.extend,
      // Rich-financial: navy/blue accent via CSS variables (info semantic state)
      // CSS variables are defined in app/layout.tsx globals
    },
  },
};
