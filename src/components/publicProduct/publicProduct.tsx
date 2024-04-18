import type { productType } from "@/types/types"
import { findExistingImg } from "@/utiles/findExistingImg"
import Image from 'next/image'
import Link from "next/link"

const PublicProduct = ({
	product
}: {
	product: productType,
}) => {

	const img = findExistingImg(product)

	return (
		<div>
			<span>{product.availability ? 'Available' : 'Not Available'}</span>

			{img.name
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

			<h2>{product.title}</h2>
			<h3>{product.details}</h3>

			<Link href={`/catalog/${product.id}`}>View</Link>
		</div>
	)
}

export default PublicProduct