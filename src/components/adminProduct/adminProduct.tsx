import type { productType } from '@/types/productType';
import Image from 'next/image'
import Link from 'next/link';
import { deleteProduct } from '@/actions/productActions';
import { ActionButton } from '../actionButton';
import style from './adminProduct.module.css';
import { findExistingImg } from '@/utiles/findExistingImg';


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
				product={product}
				clickHandlerAction={deleteProduct}
			>
				Delete
			</ActionButton>
			{
				img.name
					?
					<Image
						src={`/images/${product.img[img.id]}`}
						alt={product.title}
						width={200}
						height={250}
						priority 
					/>
					
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