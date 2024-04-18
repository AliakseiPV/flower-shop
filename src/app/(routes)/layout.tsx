
import type { PropsWithChildren } from "react"

export default function RoutesLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div>
			{children}
		</div>
	)
}