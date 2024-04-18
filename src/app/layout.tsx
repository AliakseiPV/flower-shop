import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Providers } from "@/provider/providers"
import { NavBar } from "@/components"
import CartContext from "@/context/cartContext"

config.autoAddCss = false
library.add(faMagnifyingGlass, faPlus)

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
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<CartContext>
						<main>
							<NavBar />
							{children}
						</main>
					</CartContext>
				</Providers>
				<Toaster position="top-right" />
			</body>
		</html>
	)
}
