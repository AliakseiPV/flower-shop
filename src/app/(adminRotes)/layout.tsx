import { AdminNavBar } from "@/components"
import type { PropsWithChildren } from "react"

export default function DashboardLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div >
			<AdminNavBar />
			{children}
		</div>
	)
}