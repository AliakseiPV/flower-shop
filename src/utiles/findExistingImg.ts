import { productType } from "@/types/types"

export const findExistingImg = (product: productType) => {
	const img = {
		name: '',
		id: 0
	}

	for (let i = 0; i < product.img.length; i++) {
		if (product.img[i].length) {
			img.name = product.img[i]
			img.id = i
			break
		}
	}
	return img
}