const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts,md}',
		'./node_modules/@svelteness/kit-docs/client/**/*.svelte'
	],

	darkMode: 'class',
	theme: {
		screens: {
			420: '420px',
			576: '576px',
			768: '768px',
			992: '992px',
			1200: '1200px',
			1280: '1280px',
			1440: '1440px',
			1460: '1460px'
		},
		extend: {
			colors: {
				brand: {
					DEFAULT: 'var(--kd-color-brand)'
				},
				gray: {
					DEFAULT: '#313131',
					50: '#FFFFFF',
					100: '#FBFBFB',
					200: '#EAEAEA',
					300: '#a5a5a5',
					400: '#616161',
					500: '#313131',
					600: '#292929',
					700: '#222222',
					800: '#1A1A1A',
					900: '#121212',
					divider: 'var(--kd-color-gray-divider)',
					soft: 'var(--kd-color-gray-soft)',
					inverse: 'var(--kd-color-gray-inverse)',
					current: 'var(--kd-color-gray-current)',
					hover: 'var(--kd-color-gray-hover)',
					'hover-inverse': 'var(--kd-color-gray-hover-inverse)',
					elevate: 'var(--kd-color-gray-elevate)',
					body: 'var(--kd-color-gray-body)'
				}
			},
			typography: kitDocsTypography
		}
	},
	plugins: [require('@tailwindcss/typography'), kitDocsVariants]
}

function kitDocsVariants({ addVariant }) {
	addVariant(
		'supports-backdrop-blur',
		'@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
	)
	addVariant('supports-scrollbars', '@supports selector(::-webkit-scrollbar)')
	addVariant('children', '& > *')
	addVariant('scrollbar', '&::-webkit-scrollbar')
	addVariant('scrollbar-track', '&::-webkit-scrollbar-track')
	addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb')
}

function kitDocsTypography(theme) {
	return {
		DEFAULT: {
			css: {
				'--tw-prose-counters': 'black',
				'--tw-prose-invert-counters': 'white',
				color: theme('colors.gray.soft'),
				fontSize: '18px',
				maxWidth: 'none',
				hr: {
					borderColor: theme('colors.gray.divider'),
					marginTop: '3em',
					marginBottom: '3em'
				},
				'h1, h2, h3': {
					letterSpacing: '-0.025em'
				},
				h2: {
					marginBottom: `${16 / 24}em`
				},
				h3: {
					marginTop: '2.4em',
					lineHeight: '1.4'
				},
				h4: {
					marginTop: '1.75em',
					fontSize: '1.125em'
				},
				'h2 small, h3 small, h4 small': {
					fontFamily: theme('fontFamily.mono').join(', '),
					fontWeight: 500
				},
				'h2 small': {
					fontSize: theme('fontSize.lg')[0],
					...theme('fontSize.lg')[1]
				},
				'h3 small': {
					fontSize: theme('fontSize.base')[0],
					...theme('fontSize.base')[1]
				},
				'h4 small': {
					fontSize: theme('fontSize.sm')[0],
					...theme('fontSize.sm')[1]
				},
				ul: {
					paddingLeft: '1rem'
				},
				'ul > li': {
					position: 'relative',
					paddingLeft: '0.25rem'
				},
				'ul > li::marker': {
					color: theme('colors.gray.inverse')
				},
				'ul > li::before': {
					content: '""',
					width: '0.75em',
					height: '0.125em',
					position: 'absolute',
					top: 'calc(0.875em - 0.0625em)',
					left: 0,
					borderRadius: '999px'
				},
				'li > p': {
					margin: 0
				},
				a: {
					fontWeight: theme('fontWeight.semibold'),
					textDecoration: 'none',
					borderBottom: `1px solid var(--kd-color-brand)`
				},
				'a:hover': {
					borderBottomWidth: '2px'
				},
				'a code': {
					color: 'inherit',
					fontWeight: 'inherit'
				},
				strong: {
					fontWeight: theme('fontWeight.semibold')
				},
				'a strong': {
					color: 'inherit',
					fontWeight: 'inherit'
				},
				code: {
					fontWeight: theme('fontWeight.medium'),
					fontVariantLigatures: 'none'
				},
				pre: {
					backgroundColor: 'var(--kd-code-fence-bg, var(--kd-prose-pre-bg))',
					boxShadow: 'none',
					display: 'flex'
				},
				'p + pre': {
					marginTop: `${-4 / 14}em`
				},
				'pre code': {
					flex: 'none',
					minWidth: '100%'
				},
				table: {
					margin: 0,
					width: '100%',
					borderCollapse: 'collapse'
				},
				thead: {
					color: theme('colors.gray.inverse'),
					borderBottomColor: theme('colors.gray.divider')
				},
				tbody: {
					verticalAlign: 'baseline'
				},
				'thead th': {
					paddingTop: 0,
					fontWeight: theme('fontWeight.semibold')
				},
				'tbody tr': {
					fontSize: theme('fontSize.sm')[0],
					borderBottomColor: theme('colors.gray.divider')
				},
				'tbody td': {
					whiteSpace: 'nowrap'
				},
				'tbody tr:nth-child(odd)': {
					backgroundColor: theme('colors.gray.100')
				},
				'tbody tr:last-child': {
					borderBottomWidth: '1px'
				},
				'tbody code': {
					fontSize: theme('fontSize.sm')[0]
				},
				'thead th:first-child': {
					paddingLeft: '0.5714286em'
				},
				'thead th:last-child': {
					paddingRight: '0.5714286em'
				},
				'tbody td:first-child': {
					paddingLeft: '0.5714286em'
				},
				'tbody td:last-child': {
					paddingRight: '0.5714286em'
				},
				'tbody tr td:first-child code': {
					color: theme('colors.indigo.500'),
					paddingLeft: '8px',
					'&::before': { display: 'none' },
					'&::after': { display: 'none' }
				},
				'figure figcaption': {
					textAlign: 'center',
					fontStyle: 'italic'
				},
				'figure > figcaption': {
					marginTop: `${12 / 14}em`
				},
				blockQuote: {
					color: theme('colors.gray.inverse'),
					borderRadius: 2,
					borderColor: 'currentColor'
				}
			}
		},
		invert: {
			css: {
				'tbody tr:nth-child(odd)': {
					backgroundColor: theme('colors.gray.700')
				},
				'tbody tr td:first-child code': {
					color: theme('colors.indigo.300')
				}
			}
		}
	}
}

module.exports = config
