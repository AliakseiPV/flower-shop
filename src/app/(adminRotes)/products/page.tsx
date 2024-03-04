import { FC } from 'react'
import { prisma } from '@/prisma'
import Image from 'next/image'


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
					<Image src={''} alt={''} />
					<input type="file" name='productImage' />
				</div>
				<div>
					<div>
						<input type="file" name='productImage' />
						<input type="file" name='productImage' />
						<input type="file" name='productImage' />
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