"use client"

import { useState } from 'react'
import Image from 'next/image'

type inputImageTypes = {
	inputName: string,
	imgWidth: number,
	imgHeight: number
}

const InputImage = (props: inputImageTypes) => {
	const { inputName, imgWidth, imgHeight} = props
	const [selectedImage, setSelectedImage] = useState('')

	return (
		<label>
			<input
				onChange={({ target }) => {
					if (target.files) {
						const file = target.files[0]
						setSelectedImage(URL.createObjectURL(file))
					}
				}}
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