import Link from "next/link"

const PublicNavBar = () => {
	return (
		<nav>
			<h1>Flower Home</h1>
			<ul>
				<li><Link href={"/"}>Home</Link></li>
				<li><Link href={"/catalog"}>Catalog</Link></li>
				<li><Link href={"/about"}>About</Link></li>
				<li><Link href={"/services"}>Services</Link></li>
				<li><Link href={"/cart"}>Cart</Link></li>
			</ul>
		</nav>
	)
}

export default PublicNavBar