import { FC } from 'react'
import { InputImage } from '@/components'
import { addProduct } from '@/actions/actions'


const ProductsPage: FC = async () => {

	return (
		<div>
			<form action={addProduct}>
				<div>
					<InputImage inputName={'productImage'} imgWidth={250} imgHeight={300} />
				</div>
				<div>
					<div>
						<InputImage inputName={'productImage'} imgWidth={150} imgHeight={200} />
						<InputImage inputName={'productImage'} imgWidth={150} imgHeight={200} />
						<InputImage inputName={'productImage'} imgWidth={150} imgHeight={200} />
					</div>
					<div>
						<input type="text" name='title' placeholder='Name...' required />
						<input type="text" name='details' placeholder='Short description...' required />
						<input type="text" name='description' placeholder='Description...' />
						<input type="number" step="0.01" name='price' placeholder='Price' />
					</div>
					<div>
						<label>
							<input type="checkbox" name="availability" value="true" />
						</label>
						<button>Submit</button>
					</div>
				</div>

			</form>

		</div>
	)
}

export default ProductsPage