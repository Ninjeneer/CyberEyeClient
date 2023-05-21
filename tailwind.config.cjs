/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#0094FF',
				darkPrimary: '#006aff',
				bgLight: '#F4F4F4',
				danger: '#e74c3c',
				warning: "#f39c12",
				lightGray: "#e5e7eb",
				success: "#27ae60"
			}
		}
	},
	plugins: [],
}
