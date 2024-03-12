"use client"

import { useRouter } from 'next/navigation'

type option = {
	name: string,
	value: string
}

const Section = ({
	options,
	filterParams
}: {
	options: option[]
	filterParams: string,
}) => {

	const router = useRouter()

	return (
		<select
			defaultValue={filterParams}
			name="filter"
		>
			{options.map((option) =>
			(<option
				onClick={(event) => {
					const { value } = event.target as HTMLOptionElement
					router.push(`?filter=${value}`)
				}}
				key={option.value}
				value={option.value}
			>
				{option.name}
			</option>)
			)}
		</select>
	)
}

export default Section