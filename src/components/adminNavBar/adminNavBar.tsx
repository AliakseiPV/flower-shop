"use client"
import Link from 'next/link'
import styles from './adminNavbar.module.css'
import { usePathname } from 'next/navigation'

const AdminNavBar = () => {

	const pathName = usePathname()

	return (
		<div className={styles['navbar-container']}>
			<h1 className={styles.title}>Flower Home</h1>
			<nav className={styles['nav-wrapper']}>

				<Link className={pathName === '/dashboard' ? styles.active : styles.link} href='/dashboard'>Dashboard</Link>
				<Link className={pathName === '/products' ? styles.active : styles.link} href='/products'>Products</Link>
			</nav>
			<button>Logout</button>
		</div>
	)
}

export default AdminNavBar