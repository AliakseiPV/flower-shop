'use client'

import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './searchBar.module.css'
import { useRouter } from 'next/navigation'


const SearchBar = () => {

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	const router = useRouter()
	const [active, setActive] = useState(true)
	const ref = useRef<HTMLLabelElement>(null)

	const handleClickOutside = ({ target }: MouseEvent) => {
		if (ref.current && !ref.current.contains(target as Node)) {
			setActive(true)
		}
	}

	return (
		<label
			ref={ref}
			className={styles['serch-bar']}
			onClick={() => setActive(false)}
		>
			{active
				?
				<FontAwesomeIcon
					className={styles['search-icon']}
					size='xl'
					icon={faMagnifyingGlass}
				/>
				:
				<input
					onChange={(event) =>
						router.push(`?filter=${event.target.value.toLowerCase()}`)
					}
					className={styles['search-input']}
					type="text" placeholder="Search.." />
			}
		</label>
	)
}

export default SearchBar