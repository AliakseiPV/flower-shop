import { addProduct, updateProduct, findProductById } from '@/actions/productActions'
import { AdminForm, AdminProduct, Modal } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'

const ProductsPage = async ({
	searchParams }: {
		searchParams: { [key: string]: string | string[] | undefined }
	}) => {

	const modal = searchParams.modal
	const productId = Number(searchParams.id)

	const products = await prisma.product.findMany()
	const product = await findProductById(productId)

	return (
		<div>

			<Link href={`?modal=POST`}>
				Add new Product
			</Link>

			{modal === 'POST' &&
				<Modal searchParams={{ modal }}>
					<AdminForm
						productAction={addProduct}
						successMessage={'Product added'}
						product={null}
					/>
				</Modal>
			}
			{modal === 'PUT' &&
				<Modal searchParams={{ modal }}>
					<AdminForm
						productAction={updateProduct}
						successMessage={'Product updated'}
						product={product}
					/>
				</Modal>
			}

			<div>
				{products.map((product) => (
					<AdminProduct key={product.id} product={product} />
				))}
			</div>

		</div>
	)
}

export default ProductsPage