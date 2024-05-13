'use client'

import { Context } from "@/context/cartContext"
import type { ProductType } from "@/types/types"
import { useContext } from "react"
import { ActionButton } from "../actionButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


const Product = ({
	product
}: { product: ProductType | null }) => {

	const { handleAddToCart } = useContext(Context)

	return (
		<div className="flex gap-2 flex-col items-start p-5">
			<h2 className="font-semibold text-2xl my-3">{product?.title}</h2>
			<p>{product?.details}</p>
			<p className="w-[70%]">{product?.description}</p>

			<div className="w-[70%] flex items-center justify-between my-3">

				{product?.availability ?

					<ActionButton
						isIconOnly={false}
						isDisabled={false}
						clickAction={() => handleAddToCart(product)}
						className="font-semibold"
						successMessage={`${product?.title} added to cart`}
					>
						<FontAwesomeIcon icon={faPlus} />
						Add to Cart
					</ActionButton>
					:
					<ActionButton
						isIconOnly={false}
						isDisabled={true}
						clickAction={() => handleAddToCart(product)}
						className="font-semibold "
						successMessage={`${product?.title} added to cart`}
					>
						Add to Cart
					</ActionButton>
				}
				<span className="font-semibold text-red-700">${product?.price}</span>
			</div>


		</div>
	)
}

export default Product