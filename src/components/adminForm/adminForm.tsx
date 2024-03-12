"use client"

import { InputImage } from '../inputImage'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { productType } from '@/types/productType'

const AdminForm = ({
	productAction,
	successMessage,
	product,
}: {
	productAction: Function,
	successMessage: string,
	product: productType | null,
}
) => {

	const router = useRouter()

	const formAction = async (formData: FormData) => {
		router.back()
		const result = await productAction(formData, product)
		if (result?.error) {
			toast.error(result.error)
		} else {
			toast.success(successMessage)
		}
	}

	return (

		<form
			action={formAction}
		>
			<div>
				<div>
					<InputImage
						imgSrc={product?.img[0].length ? `/images/${product.img[0]}` : ''}
						inputName={'Image0'}
						imgWidth={250}
						imgHeight={300}
					/>
				</div>
				<div>
					<div>
						<InputImage
							imgSrc={product?.img[1].length ? `/images/${product.img[1]}` : ''}
							inputName={'Image1'}
							imgWidth={150}
							imgHeight={200} />
						<InputImage
							imgSrc={product?.img[2].length ? `/images/${product.img[2]}` : ''}
							inputName={'Image2'}
							imgWidth={150}
							imgHeight={200} />
						<InputImage
							imgSrc={product?.img[3].length ? `/images/${product.img[3]}` : ''}
							inputName={'Image3'}
							imgWidth={150}
							imgHeight={200} />
					</div>
					<div>
						<input defaultValue={product?.title || ''} type="text" name='title' placeholder='Name...' required />
						<input defaultValue={product?.details || ''} type="text" name='details' placeholder='Short description...' required />
						<input defaultValue={product?.description || ''} type="text" name='description' placeholder='Description...' />
						<input defaultValue={product?.price || ''} type="number" step="0.01" name='price' placeholder='Price' />
						<select name="type">
							<option value="flower">Flower</option>
							<option value="bouquet">Bouquet</option>
						</select>
					</div>
					<div>
						{product?.availability ?
							<input type="checkbox" name="availability" value="true" defaultChecked />
							:
							<input type="checkbox" name="availability" value="true" />
						}

						<button>Submit</button>
					</div>
				</div>
			</div>

		</form>
	)
}

export default AdminForm