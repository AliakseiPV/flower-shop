"use client"

import type { productType } from "@/types/productType"
import { ReactNode } from "react"
import {toast} from "react-hot-toast"

const ActionButton = async ({
	product,
	clickHandlerAction,
	children
}: {
		product: productType,
		clickHandlerAction: Function
		children: ReactNode | undefined,
}
) => {
	
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
			{children}
		</button>
	)
}

export default ActionButton