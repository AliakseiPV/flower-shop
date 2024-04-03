import {  CartForm, CartList, Modal } from "@/components"
import Link from "next/link"


const CartPage = ({
	searchParams }: {
		searchParams: { [key: string]: string | string[] | undefined }
	}) => {

	const modal = searchParams.modal as string | undefined

	return (
		<div>
			<CartList />

			{modal === 'ACTIVE' &&
				<Modal >
					<CartForm />
				</Modal>
			}

			<Link
				href={`?modal=ACTIVE`}
			>
				Checkout
			</Link>

		</div>
	)
}

export default CartPage