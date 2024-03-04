"use client"

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

type inputImageTypes = {
	inputName: string,
	imgWidth: number,
	imgHeight: number
}

const InputImage = (props: inputImageTypes) => {
	const { inputName, imgWidth, imgHeight } = props
	const [selectedImage, setSelectedImage] = useState('')

	const changeInputImgHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (target.files) {
			const file = target.files[0]
			setSelectedImage(URL.createObjectURL(file))
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
				{selectedImage ?
					(<Image
						src={selectedImage}
						alt={'product-image'}
						width={imgWidth}
						height={imgHeight}
					/>) : (
						<span>Add Image</span>
					)
				}
			</div>
		</label>
	)
}

export default InputImage