import type { ProductType } from "@/types/types"
import { findExistingImg } from "@/utiles/findExistingImg"
import { Button, Image } from "@nextui-org/react"
import { useRouter } from "next/navigation"

const PublicProduct = ({
	product
}: {
		product: ProductType,
}) => {

	const img = findExistingImg(product)
	const router = useRouter()

	return (
		<div className="flex-col w-fit relative ">
			<div className="absolute flex justify-center text-xs tracking-wide font-semibold w-fit h-fit top-3 left-3 z-20 bg-zinc-950/50 text-white backdrop-blur-2xl rounded-md">
					{product.availability
						?
					<p className="px-2 py-1">available</p>
						:
					<p className="px-2 py-1 text-yellow-400">unavailable</p>
					}
			</div>
			<Image
				radius="sm"
				isZoomed 
				alt="Woman listing to music"
				className="object-cover w-60 h-72"
				src={`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}/productsImages/${product.img[img.id]}`}
			/>
			<div className="flex flex-col align-middle justify-start py-1 tracking-wide">
				<div className="flex justify-between">
					<h4 className="text-lg font-semibold ">{product.title}</h4>
					<p className="uppercase text-base font-semibold">${product.price}</p>
				</div>
				<small className=" text-left ">{product.details}</small>
			</div>
			<Button
				radius="sm"
				className="w-full tracking-wide font-semibold"
				onClick={() => router.push(`/catalog/${product.id}`)}
			>
				View More
			</Button>
		</div>
	)
}

export default PublicProduct