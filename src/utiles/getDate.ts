export const getMinDate = () => {
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setMonth(tomorrow.getMonth() + 1);

	const year = (tomorrow.getFullYear()).toString()
	let month = (tomorrow.getMonth()).toString()
	let day = (tomorrow.getDate()).toString()

	if (month.length === 1) {
		month = `0${month}`
	}

	if (day.length === 1) {
		day = `0${day}`
	}

	return `${year}-${month}-${day}`
}

export const getMaxDate = () => {
	const date = new Date()
	date.setDate(date.getDate() + 1);
	date.setMonth(date.getMonth() + 4);

	const year = (date.getFullYear()).toString()
	let month = (date.getMonth()).toString()
	let day = (date.getDate()).toString()

	if (month.length === 1) {
		month = `0${month}`
	}

	if (day.length === 1) {
		day = `0${day}`
	}

	return `${year}-${month}-${day}`
}

export const getDate = (date: Date) => {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
