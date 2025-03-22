import type { Config } from "tailwindcss";

import tailwindcss_animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: '#171616',
			yellow: '#FFEBA8',
			dark: {
				  100 : "#262626",
				  200 : "#1B1A1A",
				  300 : "#3D3D3D",
			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				background: '#0070DF33',
				bg: "#0070DF",
  				foreground: '#B2EFFF',
				100: '#9BB0C7',
				200: '#ADB8CF',
				300: '#C6C4D8',
				400: '#DAD3E1',
				500: '#EBE2EA',
				600: '#F8F3F5',
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
			text: {
				  100: '#F6F6F6',
				  200: '#E7E7E7',
				  300: '#D1D1D1',
				  400: '#2A313C',
			},
			blue: "#0858A0",
			green : "#6BBD6E",
			red : "#EC817D",
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: '#454545',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcss_animate],
} satisfies Config;
