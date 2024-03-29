"use server"

import { prisma } from '@/prisma'
import { revalidatePath } from 'next/cache'
import { productType } from '@/types/productType'
import { deleteImage, uploadImage } from './fileActions'
import { getErrorMessage } from '@/utiles/getErrorMessage'
import { getFormData } from '@/utiles/getFormData'


export const addProduct = async (formData: FormData) => {
	try {
		const data = getFormData(formData)
		const images: string[] = new Array(4)

		for (let i = 0; i < images.length; i++) {
			const uploadImg = await uploadImage(formData, `Image${i}`)
			if (uploadImg?.name) {
				images[i] = uploadImg.name
			}
			else {
				images[i] = ''
			}
		}

		await prisma.product.create({
			data: {
				title: data.title as string,
				details: data.details as string,
				description: data.description as string | null,
				price: data.price as number | null,
				img: images as string[],
				Availability: data.availability as boolean
			}
		})
	} catch (error) {
		return { error: getErrorMessage(error) }
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
		return { error: getErrorMessage(error) }
	}

	revalidatePath('/products')
}

export const updateProduct = async (formData: FormData, product: productType) => {
	try {
		const data = getFormData(formData)
		const dbImages = product.img

		for (let i = 0; i < dbImages.length; i++) {
			const img: File | null = formData.get(`Image${i}`) as unknown as File

			if (img.name !== 'undefined') {
				await deleteImage(product.img[i])
				const uploadImg = await uploadImage(formData, `Image${i}`)

				if (uploadImg?.name) {
					dbImages[i] = uploadImg.name
				} else {
					dbImages[i] = ''
				}
			}
		}

		await prisma.product.update({
			where: {
				id: product.id
			},
			data: {
				title: data.title as string,
				details: data.details as string,
				description: data.description as string | null,
				price: data.price as number | null,
				img: dbImages as string[],
				Availability: data.availability as boolean
			}
		})

	} catch (error) {
		return { error: getErrorMessage(error) }
	}

	revalidatePath('/products')
}

export const findProductById = async (productId: number) => {
	let product = null
	if (productId) {
		product = await prisma.product.findUnique({
			where: {
				id: productId
			}
		})
	}
	return product
}