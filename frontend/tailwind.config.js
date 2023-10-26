/** @type {import('tailwindcss').Config} */
module.exports = { 
	content: [ "./src/**/*.{js,ts,jsx,tsx}" ], 
	theme: {
		extend: {
			fontFamily: {
			  sans: ['var(--font-inter)',"Open Sans"],
			  mono: ['var(--font-roboto-mono)'],
			},
		  },
		
	  }, 
	plugins: [], 
	darkMode: 'class',
}