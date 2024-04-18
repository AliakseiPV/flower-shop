import {  CartForm, CartList, Modal } from "@/components"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@nextui-org/react"
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

			<Button
				href={`?modal=ACTIVE`}
				as={Link}
				className="bg-green-200"
			>
				Checkout
				<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
			</Button>

		</div>
	)
}

export default CartPage