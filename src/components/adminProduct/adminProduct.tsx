import React from 'react'
import Image from 'next/image'

const AdminProduct = (product: { img: string; title: string }) => {
	return (
		<div>
			<button>delete</button>
			<Image
				src={`/images/${product.img}`}
				alt={product.title}
				width={200}
				height={250} />
			<button>Edit</button>
		</div>
	)
}

export default AdminProduct