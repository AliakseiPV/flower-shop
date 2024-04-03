import type { productType } from '@/types/productType'
import Image from 'next/image'
import Link from 'next/link'
import { deleteProduct } from '@/actions/productActions'
import { ActionButton } from '../actionButton'
import style from './adminProduct.module.css'
import { findExistingImg } from '@/utiles/findExistingImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../modal'
import BackButton from '../backButton/backButton'


const AdminProduct = ({
	product,
	modal
}: {
	product: productType,
	modal: string | undefined
}
) => {

	const img = findExistingImg(product)

	return (
		<div className={style['product-wrapper']}>

			{modal === 'ACTIVE' &&
				<Modal>
					<BackButton>
						<ActionButton
							className={undefined}
							clickAction={async () => {
								'use server'
								await deleteProduct(product)
							}}
							successMessage='Product deleted'
						>
							Delete Product
						</ActionButton>
					</BackButton>
				</Modal>
			}

			<Link
				href={`?modal=ACTIVE`}
				className={style.button}
			>
				<FontAwesomeIcon icon="trash" size="lg" style={{ color: "#DD5959", cursor: "pointer" }} />
			</Link>

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