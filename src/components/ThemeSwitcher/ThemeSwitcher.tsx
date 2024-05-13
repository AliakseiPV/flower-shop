'use client'
import React, { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()
	const [isSelected, setIsSelected] = useState(true)

	useEffect(() => {
		if (theme === 'light') setIsSelected(true)
		if (theme === 'dark') setIsSelected(false)
	}, [])


	return (
		<Switch
			isSelected={isSelected}
			onValueChange={() => {
				if (isSelected) {
					setIsSelected(false)
					setTheme('dark')
				}
				if (!isSelected) {
					setIsSelected(true)
					setTheme('light')
				}
			}}
			size="sm"
			color="default"
			thumbIcon={({ isSelected, className }) =>
				isSelected ?
					(
						<FontAwesomeIcon icon={faSun} className={className} />
					) :
					(
						<FontAwesomeIcon icon={faMoon} className={className} />
					)
			}
		>
		</Switch>
	)
}

export default ThemeSwitcher