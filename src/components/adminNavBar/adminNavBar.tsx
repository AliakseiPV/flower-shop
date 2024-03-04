import Link from 'next/link'
import { FC } from 'react'
import styles from './adminNavbar.module.css'

const AdminNavBar: FC = () => {
	return (
		<div>
			<h1 className={styles.title}>Flower Home</h1>
			<nav>
				<Link href='/dashboard'>Dashboard</Link>
				<Link href='/products'>Products</Link>
			</nav>
			<button>Logout</button>
		</div>
	)
}

export default AdminNavBar