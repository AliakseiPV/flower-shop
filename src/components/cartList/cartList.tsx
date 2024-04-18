'use client'

import { Context } from "@/context/cartContext"
import { useContext } from "react"
import { checkoutAction } from "@/actions/checkoutAction"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faEraser } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from "../actionButton"

const CartList = () => {

	const { cartItems, handleRemoveOneFromCart, handleRemoveAllFromCart } = useContext(Context)

	return (
		<div>
			{cartItems.map(product => (

				<div key={product.data.id}>

					<ActionButton
						clickAction={() => handleRemoveAllFromCart(product.data)}
						className="bg-red-500 font-semibold"
						successMessage={`${product.data.title} sucsessfully deleted`}>
						<FontAwesomeIcon icon={faEraser} />
						Remove
					</ActionButton>

					<h2>{product.data.title}</h2>
					<span>Quantity{product.quantity}</span>

					<ActionButton
						clickAction={() => handleRemoveOneFromCart(product.data)}
						className="bg-red-500 font-semibold rounded-full"
						successMessage={`${product.data.title} sucsessfully deleted`}>
						<FontAwesomeIcon icon={faMinus} />
					</ActionButton>
				</div>

			))}

		</div>
	)
}

export default CartList