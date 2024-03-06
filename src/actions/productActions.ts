"use server"

import { prisma } from '@/prisma'
import { revalidatePath } from 'next/cache'
import { productType } from '@/types/productType'
import { deleteImage, uploadImage } from './fileActions'

export const addProduct = async (formData: FormData) => {
	try {
		const title = formData.get('title')
		const details = formData.get('details')
		const description = formData.get('description')
		const price = Number(formData.get('price'))
		const availability = Boolean(formData.get('availability')) || false

		const images = await uploadImage(formData)

		await prisma.product.create({
			data: {
				title: title as string,
				details: details as string,
				description: description as string | null,
				price: price as number | null,
				img: images?.names as string[],
				Availability: availability as boolean
			}
		})
	} catch (error) {
		return { error }
	}

	revalidatePath('/products')
}

export const deleteProduct = async (product: productType) => {
	try {
		product.img.forEach(async img => {
			await deleteImage(img)
		})
		await prisma.product.delete({
			where: {
				id: product.id
			}
		})
	} catch (error) {
		return { error }
	}

	revalidatePath('/products')
}