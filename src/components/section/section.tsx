"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import styles from './section.module.css'

type option = {
	name: string,
	value: string
}

const Section = ({
	options,
}: {
	options: option[]
}) => {

	const router = useRouter()
	const params = useSearchParams()
	const filterParams= params.get('filter') as string

	return (
		<select
			className={styles.select}
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