import { Product, SwiperComponent } from "@/components";
import { prisma } from "@/prisma";


const ProductPage = async ({ params }: any) => {

	const productId = Number(params.productId)
	const product = await prisma.product.findUnique({
		where: {
			id: productId
		}
	})


	return (

		<div>

			<div className="w-full grid grid-cols-2 gap-10 px-10 mt-10">
				<div className="flex justify-center items-center">
					<SwiperComponent images={product?.img} />
				</div>

				<div >
					<Product product={product} />
				</div>
			</div>





		</div>
	)
}



export default ProductPage