"use server"

import { prisma } from '@/prisma'
import { revalidatePath } from 'next/cache'
import { join } from 'path'
import { writeFile, stat, unlink } from 'fs/promises'
import { renameFile } from '@/utiles/renameFile'
import { productType } from '@/types/productType'

export const uploadImage = async (data: FormData) => {
	try {
		const files: File[] | null = data.getAll('productImage') as unknown as File[]
		const fileNames: string[] = []

		files.forEach(async file => {
			if (!file.name || file.name === 'undefined') {
				return
			}

			const newFile = renameFile(file)
			fileNames.push(newFile.name)

			const bytes = await newFile.arrayBuffer()
			const buffer = Buffer.from(bytes)

			const path = join('./public', 'images', newFile.name)
			await writeFile(path, buffer)
		})
		return {
			names: fileNames,
			success: true
		}
	} catch (error) {
		return { error }
	}
}

export const deleteImage = async (name: string) => {
	try {
		const path = join('./public', 'images', name)
		await stat(path)
		await unlink(path)

	} catch (error) {
		return { error }
	}
}

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