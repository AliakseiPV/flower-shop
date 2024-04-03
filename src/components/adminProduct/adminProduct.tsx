import type { productType } from '@/types/productType'
import Image from 'next/image'
import Link from 'next/link'
import { deleteProduct } from '@/actions/productActions'
import { ActionButton } from '../actionButton'
import style from './adminProduct.module.css'
import { findExistingImg } from '@/utiles/findExistingImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AdminProduct = ({
	product
}: {
	product: productType,
}
) => {

	const img = findExistingImg(product)

	return (
		<div className={style['product-wrapper']}>

			<ActionButton
				className={style.button}
				clickAction={async () => {
					'use server'
					await deleteProduct(product)
				}}
				successMessage='Product deleted'
			>
				<FontAwesomeIcon icon="trash" size="xl" style={{ color: "#DD5959", cursor: "pointer" }} />
			</ActionButton>

			{
				img.name
					?
					<Image
						src={`/images/${product.img[img.id]}`}
						className={style.img}
						alt={product.title}
						width={200}
						height={250}
						priority
					/>
					:
					<span>No Image</span>
			}

			<Link
				className={style['edit-btn']}
				href={`?id=${product.id}&modal=PUT`}
			>
				Edit
			</Link>
		</div>
	)
}

export default AdminProduct