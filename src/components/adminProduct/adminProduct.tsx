import type { productType } from '@/types/productType';
import Image from 'next/image'
import { deleteProduct } from '@/actions/productActions';
import { ActionButton } from '../actionButton';
import Link from 'next/link';

const AdminProduct = ({
	product
}: {
	product: productType,
}
) => {

	const findImg = (product: productType) => {
		let imgId = null
		for (let i = 0; i < product.img.length; i++) {
			if (product.img[i].length) {
				imgId = i
				break
			}
		}
		return imgId
	}

	const imgId = findImg(product)

	return (
		<div>
			<ActionButton
				product={product}
				clickHandlerAction={deleteProduct}
			>
				delete
			</ActionButton>
			{
				imgId
					?
					<Image
						src={`/images/${product.img[imgId]}`}
						alt={product.title}
						width={200}
						height={250} />
					:
					<div>No Image</div>
			}
			<Link
				href={`?id=${product.id}&modal=PUT`}>
				Edit
			</Link>
		</div>
	)
}

export default AdminProduct