'use client'

import { ReactNode } from "react"
import styles from './modal.module.css'
import { useRouter } from "next/navigation"

const Modal = ({
	children,
	searchParams
}: {
	children: ReactNode | undefined,
	searchParams: { [key: string]: string | string[] | undefined }
}) => {

	const router = useRouter()
	const modal = searchParams.modal

	return (
		<div className={styles.modal} style={
			modal === 'POST' || modal === 'PUT'
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