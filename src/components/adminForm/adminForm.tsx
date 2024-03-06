"use client"

import React, { useRef } from 'react'
import { addProduct } from '@/actions/actions'
import { InputImage } from '../inputImage'

const AdminForm = () => {

	const ref = useRef<HTMLFormElement>(null)

	return (
		<form
			ref={ref}
			action={async (formData) => {
				ref.current?.reset()
				await addProduct(formData)
			}}
		>
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
					<input type="checkbox" name="availability" value="true" />
					<button>Submit</button>
				</div>
			</div>
		</form>
	)
}

export default AdminForm