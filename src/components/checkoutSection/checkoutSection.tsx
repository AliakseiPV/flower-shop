"use client"

import { updateCheckoutStatus } from '@/actions/checkoutAction'
import { statusOptions } from '@/utiles/statusOptions'
import { faChartBar, faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const CheckoutSection = ({ defaultValue, checkoutId }: { defaultValue: string, checkoutId: string }) => {

	const [disable, setDisable] = useState(true)
	const [value, setValue] = React.useState(defaultValue)

	const handleSelectionChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setValue(event.target.value)
		setDisable(false)
	}


	return (
		<div className='flex items-center gap-2 my-3'>
			<Select
				size='sm'
				isRequired
				label="Status"
				startContent={<FontAwesomeIcon icon={faChartBar} />}
				defaultSelectedKeys={[value]}
				disallowEmptySelection
				onChange={handleSelectionChange}
				className="max-w-44"
			>
				{statusOptions.map((status) => (
					<SelectItem
						key={status.uid}
						value={status.name}
						color={status.color as "primary" | "warning" | "success" | "danger"}
					>
						{status.name}
					</SelectItem>
				))}
			</Select>
			<Button
				startContent={<FontAwesomeIcon icon={faDownload} />}
				color="success"
				isDisabled={disable}
				className='font-semibold'
				onClick={async () => {
					const result = await updateCheckoutStatus(checkoutId, value)
					if (result?.error) {
						toast.error(result.error)
					} else {
						setDisable(true)
						toast.success('Status changed')
					}
				}}
			>
				Save Changes
			</Button>
		</div>

	)
}

export default CheckoutSection