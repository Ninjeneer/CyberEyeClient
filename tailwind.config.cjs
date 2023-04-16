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
				bgLight: '#F4F4F4',
				danger: '#e74c3c',
				warning: "#f39c12"
			}
		},
		// colors: {
		// 	...colors,
		// 	primary: '#0094FF'
		// }
	},
	plugins: [],
}
