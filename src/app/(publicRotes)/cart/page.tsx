import { checkoutAction } from "@/actions/checkoutAction"
import { ActionButton, CartList } from "@/components"
import { Context } from "@/context/cartContext"
import { useContext } from "react"

const CartPage = () => {


	return (
		<div>
			<CartList />

			{/* <ActionButton
				clickAction={async () => {
					// await checkoutAction()
				}}
				className={undefined}
				successMessage={""}
			>
				Checkout
			</ActionButton> */}
		</div>
	)
}

export default CartPage