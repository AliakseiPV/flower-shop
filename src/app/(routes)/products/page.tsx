import { addProduct, updateProduct, getProductById } from '@/actions/productActions'
import { AdminForm, Modal, ProductList, SearchBar, FilterSection } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterContext from '@/context/filterContext'
import { Button } from '@nextui-org/react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

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

	const { isAuthenticated, getPermission } = getKindeServerSession()
	const isLoggedIn = await isAuthenticated()

	if (!isLoggedIn) {
		redirect('/')
	}

	const requiredPremission = await getPermission('add:product')
	if (!requiredPremission?.isGranted) {
		redirect('/')
	}


	const modal = searchParams.modal as string | undefined
	const productId = Number(searchParams.id)

	const products = await prisma.product.findMany()
	const product = await getProductById(productId)

	return (
		<main>
			<div className='flex align-middle px-20'>
				<h1 className='text-lg font-semibold'>Products</h1>

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
				<div className="flex w-full gap-3 mt-4 px-20 justify-between items-end">
					<div className="flex w-fit gap-3">
						<div>
							<SearchBar products={products} />
						</div>
						<FilterSection options={sortOptions} />
					</div>
					<Button
						href={`?modal=POST`}
						as={Link}
						color="success"
						className='uppercase bg-green-200 font-semibold px-4 shadow-md'
						variant="solid"
						endContent={<FontAwesomeIcon icon="plus" size="xl" className='text-green-400' />}
					>
						Add New
					</Button>
				</div>

				<ProductList products={products} />

			</FilterContext>

		</main>
	)
}

export default ProductsPage