"use client"

import { ReactNode } from "react"
import { toast } from "react-hot-toast"

const ActionButton = async ({
	clickAction,
	children,
	className,
}: {
		clickAction: Function
	children: ReactNode | undefined,
	className: string | undefined
}
) => {

	return (
		<button
			className={className}
			onClick={() => {
				const result = clickAction()
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