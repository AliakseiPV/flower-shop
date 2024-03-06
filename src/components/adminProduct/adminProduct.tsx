import type { productType } from '@/types/productType';
import Image from 'next/image'
import { deleteProduct } from '@/actions/productActions';
import { Button } from '../button';

const AdminProduct = (props: { product: productType }) => {
	const { product } = props
	return (
		<div>
			<Button product={product} clickHandlerAction={deleteProduct} />
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
			<button>
				Edit
			</button>
		</div>
	)
}

export default AdminProduct