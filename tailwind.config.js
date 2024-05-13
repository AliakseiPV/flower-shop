/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react")

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
  theme: {
		extend: {

		},
  },
	plugins: [nextui(
		{
			themes: {
				dark: {
					colors: {
						background: "#18181b",
					}
				},
				light: {
					colors: {
						background: "#fafafa",
					}
				}
			}
			
		}
	)],
}

