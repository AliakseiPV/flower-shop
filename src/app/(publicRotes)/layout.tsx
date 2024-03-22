import { PublicNavBar } from "@/components";
import type { PropsWithChildren } from "react";

export default function PublicLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div >
			<PublicNavBar />
			{children}
		</div>
	);
}