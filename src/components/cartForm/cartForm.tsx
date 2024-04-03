'use client'

import { checkoutAction } from "@/actions/checkoutAction"
import { Context } from "@/context/cartContext"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import toast from "react-hot-toast"

const CartForm = () => {

	const { cartItems, handleClearCart } = useContext(Context)
	const router = useRouter()

	const formAction = async (formData: FormData) => {
		router.back()
		const result = await checkoutAction(cartItems, formData)
		if (result?.error) {
			toast.error(result.error)
		} else {
			handleClearCart()

			toast.success('Checkout successfull')
		}
	}

	return (
		<form
			action={formAction}
		>

			<input type="text" name="name" placeholder="Name..." required />
			<input type="email" name="email" placeholder="Email..." required />
			<input type="number" name="phone" placeholder="Phone number..." required />

			<button>Checkout</button>
		</form>
	)
}

export default CartForm