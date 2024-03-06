import { FC } from 'react'
import { AdminForm, AdminProduct } from '@/components'
import { prisma } from '@/prisma'

const ProductsPage: FC = async () => {

	const products = await prisma.product.findMany()

	return (
		<div>
			<AdminForm/>

			<div>
				{products.map((product) => (
					<AdminProduct img={product.img[0]} title={product.title}/>
				))}
			</div>


		</div>
	)
}

export default ProductsPage