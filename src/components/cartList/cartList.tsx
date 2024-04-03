'use client'

import { Context } from "@/context/cartContext"
import { useContext } from "react"
import { checkoutAction } from "@/actions/checkoutAction"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faMinus } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from "../actionButton"


const CartList = () => {

	const { cartItems, handleRemoveOneFromCart, handleRemoveAllFromCart, handleClearCart } = useContext(Context)

	const formAction = async (formData: FormData) => {
		const result = await checkoutAction(cartItems, formData)
		if (result?.error) {
			toast.error(result.error)
		} else {
			handleClearCart()

			toast.success('Checkout successfull')
		}
	}

	return (
		<div>
			{cartItems.map(product => (

				<div key={product.data.id}>

					<ActionButton
						clickAction={() => handleRemoveAllFromCart(product.data)}
						className={undefined}
						successMessage={`${product.data.title} sucsessfully deleted`}>
						<FontAwesomeIcon icon={faX} size="lg" />
					</ActionButton>

					<h2>{product.data.title}</h2>
					<span>Quantity{product.quantity}</span>

					<ActionButton
						clickAction={() => handleRemoveOneFromCart(product.data)}
						className={undefined}
						successMessage={`${product.data.title} sucsessfully deleted`}>
						<FontAwesomeIcon icon={faMinus} />
					</ActionButton>

				</div>

			))}

		</div>
	)
}

export default CartList