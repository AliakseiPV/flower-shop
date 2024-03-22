import { addProduct, updateProduct, getProductById } from '@/actions/productActions'
import { AdminForm, AdminProduct, Modal, SearchBar, Section } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'
import styles from './page.module.css'
import { filterProductByParams } from '@/utiles/sortProducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const sortOptions = [
	{ value: 'createdAt', name: 'Creation date' },
	{ value: 'flower', name: 'Flowers' },
	{ value: 'bouquet', name: 'Bouquets' },
	{ value: 'available', name: 'Avalilable' },
	{ value: 'notAvailable', name: 'Not Available' }
]

const ProductsPage = async ({
	searchParams }: {
		searchParams: { [key: string]: string | string[] | undefined }
	}) => {

	const modal = searchParams.modal as string | undefined
	const filter = searchParams.filter as string || 'createdAt'
	const productId = Number(searchParams.id)

	const products = await prisma.product.findMany()
	const product = await getProductById(productId)

	const filteredProducts = filterProductByParams(products, filter)

	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<h1 className={styles.title}>Product</h1>

				<Link
					href={`?modal=POST`}
					className={styles['add-btn']}
				>
					<FontAwesomeIcon icon="plus" size="lg" style={{ color: "#008000", }} />
					Add new Product
				</Link>

				<div className={styles['filter-container']}>
					<div className={styles['search-container']}>
						{filteredProducts.error &&
							<span className={styles['search-error']}>{filteredProducts.error}</span>
						}
						<SearchBar />
					</div>

					<Section options={sortOptions} />
				</div>


			</div>

			{modal === 'POST' &&
				<Modal>
					<AdminForm
						productAction={addProduct}
						successMessage={'Product added'}
						product={null}
					/>
				</Modal>
			} 
			{modal === 'PUT' &&
				<Modal>
					<AdminForm
						productAction={updateProduct}
						successMessage={'Product updated'}
						product={product}
					/>
				</Modal>
			}

			<div className={styles['product-contsiner']}>
				{filteredProducts.array.map((product) => (
					<AdminProduct key={product.id} product={product} />
				))}
			</div>

		</main>
	)
}

export default ProductsPage