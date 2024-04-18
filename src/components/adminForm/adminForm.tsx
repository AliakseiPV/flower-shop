"use client"

import { InputImage } from '../inputImage'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { productType } from '@/types/types'
import styles from './adminForm.module.css'

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
			className={styles.form}
		>
			<div className={styles.content}>
				<div className={styles['main-img']}>
					<InputImage
						imgSrc={product?.img[0].length ? `/images/${product.img[0]}` : ''}
						inputName={'Image0'}
						imgWidth={250}
						imgHeight={320}
					/>
				</div>
				<div >
					<div className={styles['img-container']}>
						<InputImage
							imgSrc={product?.img[1].length ? `/images/${product.img[1]}` : ''}
							inputName={'Image1'}
							imgWidth={170}
							imgHeight={200}
						/>
						<InputImage
							imgSrc={product?.img[2].length ? `/images/${product.img[2]}` : ''}
							inputName={'Image2'}
							imgWidth={170}
							imgHeight={200}
						/>
						<InputImage
							imgSrc={product?.img[3].length ? `/images/${product.img[3]}` : ''}
							inputName={'Image3'}
							imgWidth={170}
							imgHeight={200}
						/>
					</div>
					<div className={styles['content-wrapper']}>
						<input
							defaultValue={product?.title || ''}
							type="text"
							name='title'
							placeholder='Name...'
							required
							className={styles['input-text']}
						/>
						<input
							defaultValue={product?.details || ''}
							type="text"
							name='details'
							placeholder='Short description...'
							required
							className={styles['input-text']}
						/>
						<textarea
							defaultValue={product?.description || ''}
							name='description'
							placeholder='Description...'
							className={styles.description}
						/>
						<input
							defaultValue={product?.price || ''}
							type="number"
							step="0.01"
							name='price'
							placeholder='Price'
							className={styles['input-text']}
						/>
					</div>
					<div className={styles.footer}>

						<select className={styles.select} name="type">
							<option value="flower">Flower</option>
							<option value="bouquet">Bouquet</option>
						</select>

						{product?.availability ?

							<input
								className={styles.availability}
								type="checkbox" name="availability"
								value="true"
								defaultChecked
							/>

							:
							<input
								className={styles.availability}
								type="checkbox"
								name="availability"
								value="true"
							/>

						}

						<button className={styles.btn}>Submit</button>
					</div>
				</div>
			</div>

		</form>
	)
}

export default AdminForm