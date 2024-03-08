"use client"

import { InputImage } from '../inputImage'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { productType } from '@/types/productType'


const AdminForm = async ({
	productAction,
	successMessage,
	product,
}: {
	productAction: Function,
	successMessage: string,
	product: productType | null
}
) => {

	const router = useRouter()

	const formAction = async (formData: FormData) => {
		router.back()
		const result = await productAction(formData)
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
						imgSrc={product?.img[0] ? `/images/${product.img[0]}` : ''}
						inputName={'productImage'}
						imgWidth={250}
						imgHeight={300}
					/>
				</div>
				<div>
					<div>
						<InputImage
							imgSrc={product?.img[1] ? `/images/${product.img[1]}` : ''}
							inputName={'productImage'}
							imgWidth={150}
							imgHeight={200} />
						<InputImage
							imgSrc={product?.img[2] ? `/images/${product.img[2]}` : ''}
							inputName={'productImage'}
							imgWidth={150}
							imgHeight={200} />
						<InputImage
							imgSrc={product?.img[3] ? `/images/${product.img[3]}` : ''}
							inputName={'productImage'}
							imgWidth={150}
							imgHeight={200} />
					</div>
					<div>
						<input defaultValue={product?.title || ''} type="text" name='title' placeholder='Name...' required />
						<input defaultValue={product?.details || ''} type="text" name='details' placeholder='Short description...' required />
						<input defaultValue={product?.description || ''} type="text" name='description' placeholder='Description...' />
						<input defaultValue={product?.price || ''} type="number" step="0.01" name='price' placeholder='Price' />
					</div>
					<div>
						{product?.Availability ?
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