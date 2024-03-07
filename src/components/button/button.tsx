"use client"

import type { productType } from "@/types/productType"
import {toast} from "react-hot-toast"

const Button = async (props: { product: productType, clickHandlerAction: Function }) => {
	const { product, clickHandlerAction } = props
	return (
		<button
			onClick={async () => {
				const result = await clickHandlerAction(product)
				if (result?.error) {
					toast.error(result.error)
				} else {
					toast.success("Product deleted")
				}
			}}
		>
			delete
		</button>
	)
}

export default Button