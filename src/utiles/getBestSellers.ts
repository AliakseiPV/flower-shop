import { ProductType } from "@/types/types";

export const getBestSellers = (products: ProductType[]) => {
	const bestSellers: ProductType[] = []
	const sortProducts = products.sort((a, b) => a.totalSold - b.totalSold)

	if (sortProducts.length >= 3) {
		for (let i = 0; i < 3; i++) {
			bestSellers.push(sortProducts[i])
		}
	} else {
		for (let i = 0; i < sortProducts.length; i++) {
			bestSellers.push(sortProducts[i])
		}
	}


	return bestSellers
}