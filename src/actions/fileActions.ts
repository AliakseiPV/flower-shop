"use server"

import { join } from 'path'
import { writeFile, stat, unlink } from 'fs/promises'
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