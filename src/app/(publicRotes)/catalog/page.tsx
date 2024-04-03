import { PublicProduct } from "@/components";
import { prisma } from "@/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Каталог | Цветочный Дом",
	description: "Цветы Барановичи | Букеты | Цветочные композиции",
};

const CatalogPage = async () => {

	const products = await prisma.product.findMany()

	return (
		<div>

			{products.map(product => (
				<PublicProduct key={product.id} product={product} />
			))}

		</div>
	)
}

export default CatalogPage