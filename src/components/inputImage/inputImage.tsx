"use client"

import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

type inputImageType = {
	imgSrc: string,
	inputName: string,
	imgWidth: number,
	imgHeight: number,
}

const InputImage = (props: inputImageType) => {
	const { inputName, imgWidth, imgHeight, imgSrc } = props

	const [image, setImage] = useState(imgSrc)

	const changeInputImgHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (target.files) {
			const file = target.files[0]
			setImage(URL.createObjectURL(file))
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
				{image ?
					<Image
						src={image}
						alt={'product-image'}
						width={imgWidth}
						height={imgHeight}
					/>
					:
					<span>Add Image</span>
				}
			</div>
		</label>
	)
}

export default InputImage