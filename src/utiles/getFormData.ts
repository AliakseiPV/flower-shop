export const getFormData = (formData: FormData) => {
	const data: {
		title: string,
		details: string,
		description: string | null,
		price: number | null,
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