export const getAdminFormData = (formData: FormData) => {
	const data: {
		title: string,
		details: string,
		description: string | null,
		price: number,
		availability: boolean,
		type: string
	} = {
		title: formData.get('title') as string,
		details: formData.get('details') as string,
		description: formData.get('description') as string | null,
		price: Number(formData.get('price')),
		availability: Boolean(formData.get('availability')) || false,
		type: formData.get('type') as string
	}

	return data
}

export const getCartFormData = (FormData: FormData) => {
	const data: {
		name: string,
		phone: string,
		email: string
	} = {
		name: FormData.get('name') as string,
		phone: FormData.get('phone') as string,
		email: FormData.get('email') as string
	}

	return data
}