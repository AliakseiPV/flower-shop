import { ProductType } from "@/types/types"

export const filterProductByParams = (products: Array<ProductType>, filterParams: string) => {
	let productArr: {
		array: Array<ProductType>
		error: string | null
	}
		= {
		array: [...products],
		error: null
	}

	if (!filterParams) {
		return productArr
	}

	if (filterParams === 'createdAt') {
		productArr.array.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
		return productArr
	}

	if (filterParams === 'bouquet' || filterParams === 'flower') {
		productArr.array = productArr.array.filter((product) => product.type === filterParams)
		return productArr
	}

	if (filterParams === 'available') {
		productArr.array = productArr.array.filter((product) => product.availability)
		return productArr
	}

	if (filterParams === 'notAvailable') {
		productArr.array = productArr.array.filter((product) => !product.availability)
		return productArr
	}

	const array = productArr.array.filter((product) =>
		product.title.toLowerCase().includes(filterParams) ||
		product.details.toLowerCase().includes(filterParams))

	if (!array.length) {
		productArr.array.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
		productArr.error = 'No results found'
		return productArr
	}

	productArr.array = array

	return productArr
}