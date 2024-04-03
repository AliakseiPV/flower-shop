'use client'

import { Context } from "@/context/cartContext"
import { useContext } from "react"
import { checkoutAction } from "@/actions/checkoutAction"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from '@fortawesome/free-solid-svg-icons'



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

					<button
						onClick={() => handleRemoveAllFromCart(product.data)}
					>
						<FontAwesomeIcon icon={faX} size="lg"/>
					</button>
					<h2>{product.data.title}</h2>
					<span>Quantity{product.quantity}</span>


					<button
						onClick={() => handleRemoveOneFromCart(product.data)}
					>
						Remove
					</button>
				</div>

			))}

			<form
				action={formAction}
			>

				<input type="text" name="name" placeholder="Name..." required />
				<input type="email" name="email" placeholder="Email..." required />
				<input type="number" name="phone" placeholder="Phone number..." required />

				<button>Checkout</button>
			</form>

		</div>
	)
}

export default CartList