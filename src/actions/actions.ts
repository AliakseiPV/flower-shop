"use server"

import { prisma } from '@/prisma'
import { revalidatePath } from 'next/cache'
import { join } from 'path'
import { writeFile } from 'fs/promises'
import { renameFile } from '@/utiles/renameFile'

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
			console.log(`file path - ${path}`);
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

export const addProduct = async (formData: FormData) => {

	try {
		const title = formData.get('title')
		const details = formData.get('details')
		const description = formData.get('description')
		const price = Number(formData.get('price'))
		const availability = Boolean(formData.get('availability')) || false

		const images = await uploadImage(formData)

		const product = await prisma.product.create({
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