"use server"

import { join } from 'path'
import { writeFile, stat, unlink } from 'fs/promises'
import { renameFile } from '@/utiles/renameFile'

export const uploadImage = async (data: FormData, inputName: string) => {
	try {
		const file: File | null = data.get(inputName) as unknown as File

		if (!file) {
			throw new Error('No file uploaded')
		}
		
		if (file.name !== 'undefined') {
			const newFile = renameFile(file)

			const bytes = await newFile.arrayBuffer()
			const buffer = Buffer.from(bytes)

			const path = join('./public', 'images', newFile.name)
			await writeFile(path, buffer)

			return {
				name: newFile.name,
				success: true
			}
		}

	} catch (error) {
		return { error }
	}
}

export const deleteImage = async (name: string) => {
	try {
		const path = join('./public', 'images', name)
		const fileStat = await stat(path)

		if (fileStat.isFile()) {
			await unlink(path)
		}
	} catch (error) {
		return { error }
	}
}