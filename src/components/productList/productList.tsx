'use client'

import { Context } from '@/context/filterContext'
import { filterProductByParams } from '@/utiles/sortProducts'
import React, { useContext } from 'react'
import { AdminProduct } from '../adminProduct'
import { ProductType } from '@/types/types'
import { usePathname } from 'next/navigation'
import { PublicProduct } from '../publicProduct'

const ProductList = ({ products }: { products: ProductType[] }) => {

	const { filterParams } = useContext(Context)
	const filteredProducts = filterProductByParams(products, filterParams)
	const pathName = usePathname()

	return (
		<div className='gap-8 grid auto-rows-fr grid-cols-5 mx-20 my-10'>
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