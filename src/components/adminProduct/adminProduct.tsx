'use client'

import type { ProductType } from '@/types/types'
import Link from 'next/link'
import { deleteProduct } from '@/actions/productActions'
import { ActionButton } from '../actionButton'
import { findExistingImg } from '@/utiles/findExistingImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { faEraser, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, CardFooter, Image } from '@nextui-org/react'

const AdminProduct = ({
	product,
}: {
		product: ProductType,
}
) => {

	const img = findExistingImg(product)
	const searchParams = useSearchParams()
	const router = useRouter()
	const modal = searchParams.get('modal')

	return (
		<Card
			isFooterBlurred
			radius="lg"
			className="border-none w-fit h-fit"
		>

			{
				modal === 'ACTIVE' &&
				<Modal>
						<ActionButton
							isIconOnly={false}
						isDisabled={false}
						clickAction={async () => {
							router.back()
							return await deleteProduct(product)
						}}
						className="rounded-lg border-2 border-red-700 bg-zinc-200 font-semibold"
						successMessage={'Product deleted'}
					>
						<FontAwesomeIcon icon={faEraser} />
						Delete Product
					</ActionButton>
				</Modal>
			}

			<Link
				href={`?modal=ACTIVE`}
				className="border-none bg-transparent absolute z-30 right-4 top-2 text-red-500 cursor-pointer"
			>
				<FontAwesomeIcon icon={faTrash} size="lg" />
			</Link>

			{
				img.name
					?
					<Image
						isZoomed
						alt="Woman listing to music"
						className="object-cover w-60 h-72"
						src={`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}/productsImages/${product.img[img.id]}`}
					/>
					:
					<span className='bg-zinc-100 dark:bg-default/60 flex w-60 h-72 items-center justify-center font-semibold'>No Image</span>
			}

			<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
				{product.availability
					?
					<p className="text-tiny text-white uppercase font-bold">available</p>
					:
					<p className="text-tiny text-white uppercase font-bold">unavailable</p>
				}

				<Button
					href={`?id=${product.id}&modal=PUT`}
					as={Link}
					className="text-tiny text-white bg-black/20"
					variant="flat"
					color="default"
					radius="lg"
					size="sm"
					startContent={<FontAwesomeIcon icon={faPenToSquare} />}
				>
					Edit
				</Button>
			</CardFooter>
		</Card>
	)
}

export default AdminProduct