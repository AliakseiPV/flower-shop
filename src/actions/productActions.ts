"use server"

import { prisma } from '@/prisma'
import { revalidatePath } from 'next/cache'
import { ProductType } from '@/types/types'
import { deleteFileFromS3, uploadImage } from './fileActions'
import { getErrorMessage } from '@/utiles/getErrorMessage'
import { getAdminFormData } from '@/utiles/getFormData'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'


export const addProduct = async (formData: FormData) => {

	try {

		const { isAuthenticated, getPermission } = getKindeServerSession()
		const isLoggedIn = await isAuthenticated()

		if (!isLoggedIn) {
			redirect('/')
		}

		const requiredPremission = await getPermission('add:product')
		if (!requiredPremission?.isGranted) {
			redirect('/')
		}

		const data = getAdminFormData(formData)
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
				title: data.title,
				details: data.details,
				description: data.description,
				price: data.price,
				img: images,
				availability: data.availability,
				type: data.type
			}
		})
	} catch (error) {
		return { error: getErrorMessage(error) }
	}

	revalidatePath('/products')
}

export const deleteProduct = async (product: ProductType) => {

	try {

		const { isAuthenticated, getPermission } = getKindeServerSession()
		const isLoggedIn = await isAuthenticated()

		if (!isLoggedIn) {
			redirect('/')
		}

		const requiredPremission = await getPermission('delete:product')
		if (!requiredPremission?.isGranted) {
			redirect('/')
		}

		product.img.forEach(async img => {
			await deleteFileFromS3(img)
		})
		await prisma.checkoutOnProduct.deleteMany({
			where: {
				productId: product.id
			}
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

export const updateProduct = async (formData: FormData, product: ProductType) => {

	try {

		const { isAuthenticated, getPermission } = getKindeServerSession()
		const isLoggedIn = await isAuthenticated()

		if (!isLoggedIn) {
			redirect('/')
		}

		const requiredPremission = await getPermission('update:product')
		if (!requiredPremission?.isGranted) {
			redirect('/')
		}

		const data = getAdminFormData(formData)
		const dbImages = product.img

		for (let i = 0; i < dbImages.length; i++) {
			const img: File | null = formData.get(`Image${i}`) as unknown as File

			if (img.name !== 'undefined') {
				await deleteFileFromS3(product.img[i])
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
				title: data.title,
				details: data.details,
				description: data.description,
				price: data.price,
				img: dbImages,
				availability: data.availability,
				type: data.type
			}
		})

	} catch (error) {
		return { error: getErrorMessage(error) }
	}

	revalidatePath('/products')
}

export const getProductById = async (productId: number) => {

	if (!productId) { return null }

	return await prisma.product.findUnique({
		where: {
			id: productId
		}
	})
}