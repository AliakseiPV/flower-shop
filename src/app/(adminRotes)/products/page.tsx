import { addProduct, updateProduct, findProductById } from '@/actions/productActions'
import { AdminForm, AdminProduct, Modal } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'
import styles from './page.module.css'

const ProductsPage = async ({
	searchParams }: {
		searchParams: { [key: string]: string | string[] | undefined }
	}) => {

	const modal = searchParams.modal
	const productId = Number(searchParams.id)

	const products = await prisma.product.findMany()
	const product = await findProductById(productId)

	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<h1 className={styles.title}>Product</h1>

				<Link
					href={`?modal=POST`}
				>
					Add new Product
				</Link>

				<div>Filter</div>
			</div>

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

			<div className={styles['product-contsiner']}>
				{products.map((product) => (
					<AdminProduct key={product.id} product={product} />
				))}
			</div>

		</main>
	)
}

export default ProductsPage