"use client"

import { Button } from "@nextui-org/react"
import { ReactNode } from "react"
import { toast } from "react-hot-toast"

const ActionButton = ({
	clickAction,
	children,
	className,
	successMessage
}: {
	clickAction: Function
	children: ReactNode | undefined,
	className: string | undefined
	successMessage: string
}
) => {

	return (
		<Button
			className={className}
			onClick={() => {
				const result = clickAction()
				if (result?.error) {
					toast.error(result.error)
				} else {
					toast.success(successMessage)
				}
			}}
		>
			{children}
		</Button>
	)
}

export default ActionButton