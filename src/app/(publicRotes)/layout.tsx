import { PublicNavBar } from "@/components";
import CartContext from "@/context/cartContext";
import type { PropsWithChildren } from "react";

export default function PublicLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<CartContext>
			<PublicNavBar />
			{children}
		</CartContext>
	);
}