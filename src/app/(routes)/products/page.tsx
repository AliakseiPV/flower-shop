import { addProduct, updateProduct, getProductById } from '@/actions/productActions'
import { AdminForm, Modal, ProductList, SearchBar, FilterSection } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'
import styles from './page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterContext from '@/context/filterContext'
import { Button } from '@nextui-org/react'

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
	const productId = Number(searchParams.id)

	const products = await prisma.product.findMany()
	const product = await getProductById(productId)

	return (
		<main className={styles.main}>
			<div className={styles.header}>
				<h1 className={styles.title}>Products</h1>
				<Button
					href={`?modal=POST`}
					as={Link}
					color="success"
					className=' bg-green-200 font-semibold  px-4'
					variant="solid"
				>
					Add Product
					<FontAwesomeIcon icon="plus" size="lg" className='text-green-400' />
				</Button>
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

			<FilterContext>
				<div className={styles['filter-container']}>
					<div className={styles['search-container']}>
						<SearchBar products={products} />
					</div>
					<FilterSection options={sortOptions} />
				</div>

				<ProductList products={products} />

			</FilterContext>

		</main>
	)
}

export default ProductsPage