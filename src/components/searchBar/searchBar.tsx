'use client'

import { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@nextui-org/react'
import { filterProductByParams } from '@/utiles/sortProducts'
import { ProductType } from '@/types/types'
import { Context } from '@/context/filterContext'



const SearchBar = ({ products }: { products: ProductType[] }) => {

	const [value, setValue] = useState('')

	const { filterParams, setFilterParams } = useContext(Context)
	const filteredProducts = filterProductByParams(products, filterParams)

	return (
		<>
			<Input
				label="Search"
				value={value}
				isClearable
				radius="md"
				onChange={(event) => {
					setValue(event.target.value)
					setFilterParams(event.target.value)
				}}
				onClear={() => {
					setValue('')
					setFilterParams('')
				}}
				classNames={{
					label: "text-black/50 dark:text-white/90",
					input: [
						"bg-transparent",
						"text-black/90 dark:text-white/90",
						"placeholder:text-default-700/50 dark:placeholder:text-white/60",
					],
					innerWrapper: "bg-transparent",
					inputWrapper: [
						"shadow-md",
						"bg-default-200/50",
						"dark:bg-default/60",
						"backdrop-blur-xl",
						"backdrop-saturate-200",
						"hover:bg-default-200/70",
						"dark:hover:bg-default/70",
						"group-data-[focused=true]:bg-default-200/50",
						"dark:group-data-[focused=true]:bg-default/60",
						"!cursor-text",
					],
				}}
				placeholder="Type to search..."
				startContent={
					<FontAwesomeIcon
						icon={faMagnifyingGlass}/>
				}
			/>
			{filteredProducts.error &&
				<span className='absolute left-0 -bottom-9 text-red-400'>Result not found</span>
			}
		</>
	)
}

export default SearchBar