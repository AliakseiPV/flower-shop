import type { PropsWithChildren } from "react";

export default function DashboardLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div >
			<h1>Public Layout</h1>
			{children}
		</div>
	);
}