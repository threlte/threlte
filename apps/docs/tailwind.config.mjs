import starlightPlugin from '@astrojs/starlight-tailwind'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['inter', 'sans-serif']
			},
			colors: {
				orange: {
					DEFAULT: '#FE3D00',
					50: '#FFC8B7',
					100: '#FFB8A2',
					200: '#FF9979',
					300: '#FF7A51',
					400: '#FF5B28',
					500: '#FE3D00',
					600: '#C63000',
					700: '#8E2200',
					800: '#561500',
					900: '#1E0700'
				},
				blue: {
					DEFAULT: '#2F7DC6',
					50: '#BDD7EF',
					100: '#ADCDEB',
					200: '#8CB9E4',
					300: '#6BA5DC',
					400: '#4A91D4',
					500: '#2F7DC6',
					600: '#246099',
					700: '#19446B',
					800: '#0F273E',
					900: '#0E1625'
				},
				green: {
					DEFAULT: '#2AC944',
					50: '#BAF1C3',
					100: '#A9EDB4',
					200: '#87E697',
					300: '#66DF79',
					400: '#44D85C',
					500: '#2AC944',
					600: '#209B34',
					700: '#176C25',
					800: '#0D3E15',
					900: '#030F05'
				}
			}
		}
	},
	plugins: [
		starlightPlugin(),
		function ({ addUtilities, matchUtilities, theme }) {
			matchUtilities(
				{
					glow: (value) => {
						return {
							boxShadow: `0 0px 40px -3px ${value}`
						}
					},
					'text-glow': (value) => {
						return {
							filter: `drop-shadow(0 0px 50px ${value})`
						}
					}
				},
				{
					values: flattenColorPalette(theme('colors')),
					type: 'color'
				}
			)
		}
	]
}
