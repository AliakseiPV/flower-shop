import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faMagnifyingGlass, faTrash, faPlus)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Цветочный Дом",
	description: "Цветы Барановичи",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" >
			<body className={inter.className}>
				{children}
				<Toaster position="top-right" />
			</body>
		</html>
	)
}
