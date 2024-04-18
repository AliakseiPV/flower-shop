import { ProductList, PublicProduct, SearchBar, FilterSection } from "@/components";
import FilterContext from "@/context/filterContext";
import { prisma } from "@/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Catalog | Perrfect Petals",
	description: "Цветы Барановичи | Букеты | Цветочные композиции",
};

const sortOptions = [
	{ value: 'createdAt', name: 'Creation date' },
	{ value: 'flower', name: 'Flowers' },
	{ value: 'bouquet', name: 'Bouquets' },
	{ value: 'available', name: 'Avalilable' },
	{ value: 'notAvailable', name: 'Not Available' }
]


const CatalogPage = async () => {

	const products = await prisma.product.findMany()

	return (
		<div>

			<FilterContext>
				<div>
					<div>
						<SearchBar products={products} />
					</div>
					<FilterSection options={sortOptions} />
				</div>

				<ProductList products={products} />

			</FilterContext>
			{/* {products.map(product => (
				<PublicProduct key={product.id} product={product} />
			))} */}

		</div>
	)
}

export default CatalogPage