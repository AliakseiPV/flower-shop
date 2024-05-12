"use server"

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { renameFile } from "@/utiles/renameFile";

const s3Client = new S3Client({
	region: process.env.NEXT_AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY_ID as string,
	}
});

async function uploadFileToS3(file: Buffer, fileName: string) {

	const fileBuffer = file;

	const params = {
		Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
		Key: `productsImages/${fileName}`,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);
	return fileName;
}


export const uploadImage = async (data: FormData, inputName: string) => {
	try {

		const file: File | null = data.get(inputName) as unknown as File

		if (!file) {
			throw new Error('File is required')
		}
		if (file.name !== 'undefined') {
			const newFile = renameFile(file)

			const bytes = await newFile.arrayBuffer()
			const buffer = Buffer.from(bytes)

			const fileName = await uploadFileToS3(buffer, newFile.name)

			return {
				name: fileName,
				success: true
			}
		}

	} catch (error) {
		return { error }
	}
}

export const deleteFileFromS3 = async (name: string) => {

	try {
		const deleteParams = {
			Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
			Key: `productsImages/${name}`,
		}
		await s3Client.send(new DeleteObjectCommand(deleteParams))
	} catch (error) {
		return { error }
	}
}