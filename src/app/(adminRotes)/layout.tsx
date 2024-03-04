import { AdminNavBar } from "@/components"
import type { PropsWithChildren } from "react"

export default function AdminLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div >
			<AdminNavBar />
			{children}
		</div>
	)
}