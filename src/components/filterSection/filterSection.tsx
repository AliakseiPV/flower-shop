'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { useContext, useState } from 'react'
import { Context } from '@/context/filterContext'

type option = {
	name: string,
	value: string
}

const FilterSection = ({
	options,
}: {
	options: option[]
}) => {

	const [values, setValues] = useState(new Set([]));
	const { setFilterParams } = useContext(Context)

	const handleSelectionChange = (event: any) => {
		setValues(new Set(event.target.value.split(",")))
		setFilterParams(event.target.value)
	}

	return (
		<Select
			label="Filter products"
			className="min-w-fit w-40"
			name="filter"
			selectedKeys={values}
			onChange={handleSelectionChange}
		>
			{options.map((option) => (
				<SelectItem
					key={option.value}
					value={option.value}
				>
					{option.name}
				</SelectItem>
			))}
		</Select>
	)
}

export default FilterSection