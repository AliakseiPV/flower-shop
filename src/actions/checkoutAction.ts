'use server'

import { prisma } from "@/prisma";
import { cartItem, productType } from "@/types/types";
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
				deliveryDate: data.deliveryDate,
				comment: data.comment,
				CheckoutOnProduct: {
					create: createCheckoutProducts(products)
				}
			}
		})
	} catch (error) {
		return { error: getErrorMessage(error) }
	}
}

export const getCheckoutProducts = async (checkoutId: string) => {

	let products: {
		quantity: number,
		checkoutDate: Date,
		product: productType | null
	}[] = []

	const checkoutOnProduct = await prisma.checkoutOnProduct.findMany({
		where: {
			checkoutId: checkoutId
		}
	})

	checkoutOnProduct.forEach(async (element) => {
		products.push({
			quantity: element.checkoutQuantity,
			checkoutDate: element.checkoutAt,
			product: await prisma.product.findFirst({
				where: {
					id: element.productId
				}
			})
		})
	})

	return products

}

export const updateCheckoutStatus = async (checkoutId: string, value: string) => {
	try {
		await prisma.checkout.update({
			where: {
				id: checkoutId
			},
			data: {
				status: value
			}
		})
	} catch (error) {
		return { error: getErrorMessage(error) }
	}
}