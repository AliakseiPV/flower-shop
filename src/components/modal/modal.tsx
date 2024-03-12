'use client'

import { ReactNode } from "react"
import styles from './modal.module.css'
import { useRouter } from "next/navigation"

const Modal = ({
	children,
	modalParams,
}: {
	children: ReactNode | undefined,
	modalParams: string | undefined
}) => {

	const router = useRouter()

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
					className={styles.close}
				>
					Close
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal