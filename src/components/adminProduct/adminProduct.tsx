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

	return (
		<div>
			<ActionButton
				product={product}
				clickHandlerAction={deleteProduct}
			>
				delete
			</ActionButton>
			{
				product.img.length
					?
					<Image
						src={`/images/${product.img[0]}`}
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