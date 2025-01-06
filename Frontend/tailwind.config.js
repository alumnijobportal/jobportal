/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
  			sans: [
  				'Roboto',
  				'sans-serif'
  			],
  			poppins: [
  				'Poppins',
  				'sans-serif'
  			],
  			serif: [
  				'Merriweather',
  				'serif'
  			],
  			display: [
  				'Oswald',
  				'sans-serif'
  			],
  			handwriting: [
  				'Dancing Script',
  				'cursive'
  			]
  		},
    },
  },
  plugins: [],
}

