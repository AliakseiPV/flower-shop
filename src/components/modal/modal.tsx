"use client"

import { ReactNode } from "react"
import styles from './modal.module.css'
import { useRouter, useSearchParams } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from '@fortawesome/free-solid-svg-icons'

const Modal = ({
	children,
}: {
	children: ReactNode | undefined,
}) => {

	const router = useRouter()
	const params = useSearchParams()
	const modalParams = params.get('modal')

	return (
		<div className={styles.modal} style={
			modalParams === 'POST' || modalParams === 'PUT' || modalParams === 'ACTIVE'
				?
				{ display: 'block' }
				:
				{ display: 'none' }
		}>
			<div className={styles['modal-content']}>
				<button
					onClick={router.back}
					className="text-red-500 bg-none absolute z-20 right-0 top-0 px-2"
				>
					<FontAwesomeIcon icon={faX} size="sm" />
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal