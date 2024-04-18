'use client'

import { Context } from "@/context/cartContext"
import type { productType } from "@/types/types"
import { useContext } from "react"
import toast from "react-hot-toast"
import { ActionButton } from "../actionButton"


const Product = ({
	product
}: { product: productType | null }) => {

	const { handleAddToCart } = useContext(Context)

	return (
		<div>

			<ActionButton
				clickAction={() => handleAddToCart(product)}
				className="bg-green-200 font-semibold"
				successMessage={`${product?.title} added to cart`}
			>
				Add to Cart
			</ActionButton>
		</div>
	)
}

export default Product