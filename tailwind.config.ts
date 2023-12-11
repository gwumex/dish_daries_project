import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'deep-blue': '#001F3F',
        'charcoal-gray': '#001F3F',
        'muted-orange': '#FFA07A',
        'muted-orange-deep': '#FFA07F',
        'ivory-white': '#F8F8F8',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ {
      mytheme: {
        "primary": "#001F3F",
        "secondary": "#FFA07F",
        "accent": "#FFA07A",
        "neutral": "#404040",
        "base-100": "#F8F8F8",
      },
    },], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  },

}
export default config
