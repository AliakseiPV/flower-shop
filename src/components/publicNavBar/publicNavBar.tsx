'use client'

import { Context } from "@/context/cartContext"
import Link from "next/link"
import { useContext } from "react"

const PublicNavBar = () => {

	const countCartCount = () => {
		let count = 0
		cartItems.forEach(element => {
			count += element.quantity
		})

		return count
	}

	const { cartItems } = useContext(Context)
	const count = countCartCount()



	return (
		<nav>
			<h1>Flower Home</h1>
			<ul>
				<li><Link href={"/"}>Home</Link></li>
				<li><Link href={"/catalog"}>Catalog</Link></li>
				<li><Link href={"/about"}>About</Link></li>
				<li><Link href={"/services"}>Services</Link></li>
				<li>
					<Link href={"/cart"}>Cart</Link>
					{count !== 0 && <span>{count}</span>}
				</li>
			</ul>
		</nav>
	)
}

export default PublicNavBar