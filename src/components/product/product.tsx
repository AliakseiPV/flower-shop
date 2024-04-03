'use client'

import { Context } from "@/context/cartContext"
import type { productType } from "@/types/productType"
import { useContext } from "react"
import toast from "react-hot-toast"


const Product = ({
	product
}: { product: productType | null }) => {

	const { handleAddToCart } = useContext(Context)

	return (
		<div>

			<button
				onClick={() => {
					const result = handleAddToCart(product)
					if (result?.error) {
						toast.error(result.error)
					} else {
						toast.success('Product added to cart')
					}
				}}
			>
				Add to Cart
			</button>
		</div>
	)
}

export default Product