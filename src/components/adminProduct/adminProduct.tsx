'use client'

import type { productType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { deleteProduct } from '@/actions/productActions'
import { ActionButton } from '../actionButton'
import style from './adminProduct.module.css'
import { findExistingImg } from '@/utiles/findExistingImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { faEraser, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@nextui-org/react'

const AdminProduct = ({
	product,
}: {
	product: productType,
}
) => {

	const img = findExistingImg(product)
	const searchParams = useSearchParams()
	const router = useRouter()
	const modal = searchParams.get('modal')

	return (
		<div className={style['product-wrapper']}>

			{
				modal === 'ACTIVE' &&
				<Modal>
					<ActionButton
						clickAction={async () => {
							router.back()
							return await deleteProduct(product)
						}}
						className={style.img}
						successMessage={'Product deleted'}
					>
						<FontAwesomeIcon icon={faEraser} />
						Delete Product
					</ActionButton>
				</Modal>
			}

			<Link
				href={`?modal=ACTIVE`}
				className="border-none bg-transparent absolute right-2 top-0 text-red-500 cursor-pointer"
			>
				<FontAwesomeIcon icon={faTrash} size="sm" />
			</Link>

			{
				img.name
					?
					<Image
						src={`/images/${product.img[img.id]}`}
						className="rounded-xl"
						alt={product.title}
						width={170}
						height={200}
						priority
					/>
					:
					<span>No Image</span>
			}

			<Button
				href={`?id=${product.id}&modal=PUT`}
				as={Link}
				color="success"
				className='absolute flex align-middle bottom-0 bg-green-200  font-semibold  px-5'
				variant="solid"
			>
				Edit
				<FontAwesomeIcon icon={faPenToSquare} />
			</Button>

		</div>
	)
}

export default AdminProduct