"use client"

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useFormStatus } from 'react-dom'

type inputImageType = {
	inputName: string,
	imgWidth: number,
	imgHeight: number,
}

const InputImage = (props: inputImageType) => {
	const { inputName, imgWidth, imgHeight } = props

	const { pending } = useFormStatus()
	const [image, setImage] = useState('')

	const changeInputImgHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (target.files) {
			const file = target.files[0]
			setImage(URL.createObjectURL(file))
		}
	}

	const showImage = () => {
		if (!pending && !image ) {
			return (<span>Add Image</span>)
		}
		if (!pending && image) {
			return (<Image
				src={image}
				alt={'product-image'}
				width={imgWidth}
				height={imgHeight}
			/>)
		}
		if (pending && image) {
			setImage('')
			return (<span>Add Image</span>)
		}
	}

	return (
		<label>
			<input
				onChange={changeInputImgHandler}
				type="file"
				name={inputName}
				accept="image/png, image/jpeg"
				hidden
			/>
			<div>
				{showImage()}
			</div>
		</label>
	)
}

export default InputImage