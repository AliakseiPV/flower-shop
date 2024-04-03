'use server'

import { prisma } from "@/prisma";
import { cartItem } from "@/types/productType";
import { getErrorMessage } from "@/utiles/getErrorMessage";
import { getCartFormData } from "@/utiles/getFormData";

const createCheckoutProducts = (products: cartItem[]) => {
	const result: {
		checkoutQuantity: number,
		product: {
			connect: { id: number; }
		}
	}[] = []

	products.forEach((item) => {
		result.push(
			{
				checkoutQuantity: item.quantity,
				product: {
					connect: {
						id: item.data.id
					}
				}
			}
		)
	})
	return result
}

export const checkoutAction = async (products: cartItem[], formData: FormData) => {

	try {
		if (!products.length) {
			throw new Error("Cart is empty");
		}

		const data = getCartFormData(formData)

		await prisma.checkout.create({
			data: {
				name: data.name,
				phone: data.phone,
				email: data.email,
				CheckoutOnProduct: {
					create: createCheckoutProducts(products)
				}
			}
		})

	} catch (error) {
		return { error: getErrorMessage(error) }
	}

}