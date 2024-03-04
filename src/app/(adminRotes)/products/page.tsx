import { FC, useState } from 'react'
import { prisma } from '@/prisma'
import Image from 'next/image'
import { InputImage } from '@/components'


const ProductsPage: FC = async () => {

	const user = await prisma.user.findFirst({
		where: {
			email: 'test@test.com'
		}
	})

	const addProduct = async (formData: FormData) => {
		"use server"

		const productImages = formData.getAll('productImage')

	}

	return (
		<div>

			{/* Hello {user?.name} */}
			<form action="">
				<div>
					<InputImage inputName={'productImage'} imgWidth={250} imgHeight={300} />
				</div>
				<div>
					<div>
						<InputImage inputName={'productImage'} imgWidth={200} imgHeight={250} />
						<InputImage inputName={'productImage'} imgWidth={200} imgHeight={250} />
						<InputImage inputName={'productImage'} imgWidth={200} imgHeight={250} />
					</div>
					<div>
						<input type="text" name='name' placeholder='Name...' />
						<input type="text" name='short-description' placeholder='Short description...' />
						<input type="text" name='description' placeholder='Description...' />
						<input type="text" name='price' placeholder='Price' />
					</div>
					<div>
						<button>Available</button>
						<button>Submit</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ProductsPage