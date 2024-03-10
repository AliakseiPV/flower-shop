import type { productType } from '@/types/productType';
import Image from 'next/image'
import { deleteProduct } from '@/actions/productActions';
import { ActionButton } from '../actionButton';
import Link from 'next/link';
import style from './adminProduct.module.css'

const AdminProduct = ({
	product
}: {
	product: productType,
}
) => {


	const findImg = (product: productType) => {
		let img = {
			name: '',
			id: 0 
		} 
		for (let i = 0; i < product.img.length; i++) {
			if (product.img[i].length) {
				img.name = product.img[i]
				img.id = i
				break
			}
		}
		return img
	}

	const img = findImg(product)

	return (
		<div className={style['product-wrapper']}>
			<ActionButton
				className={style.button}
				product={product}
				clickHandlerAction={deleteProduct}
			>
				delete
			</ActionButton>
			{
				img.name
					?
					<Image
						src={`/images/${product.img[img.id]}`}
						alt={product.title}
						width={200}
						height={250} />
					:
					<div>No Image</div>
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