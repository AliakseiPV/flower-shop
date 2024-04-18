'use client'

import React from 'react'
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from 'next-themes'


export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<NextUIProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				themes={['light', 'dark']}
			>
				{children}
			</ThemeProvider>
		</NextUIProvider>
	)
}

