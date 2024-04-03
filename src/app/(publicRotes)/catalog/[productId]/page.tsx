import { Product } from "@/components";
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
			{product?.title}

			<Product product={product} />

		</div>
	)
}



export default ProductPage