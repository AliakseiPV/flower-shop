
import type { PropsWithChildren } from "react"

export default function RoutesLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div className="min-h-[calc(100vh-25.5rem)]">
			{children}
		</div>
	)
}