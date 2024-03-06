"use client"

import type { productType } from "@/types/productType"

const Button = async (props: { product: productType, clickHandlerAction: Function }) => {
	const { product, clickHandlerAction } = props
	return (
		<button
			onClick={async () => {
				await clickHandlerAction(product)
			}}
		>
			delete
		</button>
	)
}

export default Button