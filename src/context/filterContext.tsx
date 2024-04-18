'use client'

import { createContext, useState } from 'react'
import type { Dispatch, PropsWithChildren, SetStateAction } from "react"

type Context = {
	filterParams: string,
	setFilterParams: Dispatch<SetStateAction<string>>
}

const initialContext: Context = {
	filterParams: '',
	setFilterParams: () => { }
}

export const Context = createContext<Context>(initialContext)

const FilterContext = ({ children }: PropsWithChildren<unknown>) => {

	const [filterParams, setFilterParams] = useState('')

	return (
		<Context.Provider value={{ filterParams, setFilterParams }} >
			{children}
		</Context.Provider>
	)
}

export default FilterContext
