export const getMinDate = () => {
	const tomorrow = new Date()

	const year = (tomorrow.getFullYear()).toString()
	let month = (tomorrow.getMonth() + 1).toString()
	let day = (tomorrow.getDay() + 1).toString()

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

	const year = (date.getFullYear()).toString()
	let month = (date.getMonth() + 4).toString()
	let day = (date.getDay() + 1).toString()

	if (month.length === 1) {
		month = `0${month}`
	}

	if (day.length === 1) {
		day = `0${day}`
	}

	return `${year}-${month}-${day}`
}
