'use client'

import { Context } from '@/context/filterContext'
import { filterProductByParams } from '@/utiles/sortProducts'
import React, { useContext } from 'react'
import { AdminProduct } from '../adminProduct'
import { productType } from '@/types/types'
import { usePathname } from 'next/navigation'
import { PublicProduct } from '../publicProduct'

const ProductList = ({ products }: { products: productType[] }) => {

	const { filterParams } = useContext(Context)
	const filteredProducts = filterProductByParams(products, filterParams)
	const pathName = usePathname()

	return (
		<div className='gap-2 grid grid-cols-2 sm:grid-cols-4'>
			{filteredProducts.array.map((product) => (
				pathName === '/products'
					?
					<AdminProduct key={product.id} product={product} />
					:
					pathName === '/catalog'
						?
						<PublicProduct key={product.id} product={product} />
						:
						<></>
			))}
		</div>
	)
}

export default ProductList