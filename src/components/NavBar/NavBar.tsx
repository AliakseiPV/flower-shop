'use client'

import { Context } from "@/context/cartContext"
import { useContext, useState } from "react"
import { ThemeSwitcher } from "../ThemeSwitcher"
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from 'next/navigation'

const menuItems = [
	"Dashboard",
	"Products",
	"Catalog",
	"About",
	"Services",
	"Cart",
	"Login",
]

const NavBar = () => {

	const pathName = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const {  getCartCount } = useContext(Context)
	const count = getCartCount()

	return (
		<Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="lg:hidden"
				/>
				<NavbarBrand>
					<NavbarItem>
						<Link className="font-bold text-xl" color="foreground" href="/">
							Perrfect Petals
						</Link>
					</NavbarItem>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden lg:flex gap-4" justify="center">
				<NavbarItem isActive={pathName === '/dashboard' ? true : false} >
					<Link
						color={pathName === '/dashboard' ? 'primary' : 'foreground'}
						href="/dashboard">
						Dashboard
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === '/products' ? true : false} >
					<Link
						color={pathName === '/products' ? 'primary' : 'foreground'}
						href="/products">
						Products
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === '/catalog' ? true : false} >
					<Link color={pathName === '/catalog' ? 'secondary' : 'foreground'}
						href="/catalog">
						Catalog
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === '/about' ? true : false}>
					<Link color={pathName === '/about' ? 'secondary' : 'foreground'}
						href="/about" >
						About
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === '/services' ? true : false}>
					<Link
						color={pathName === '/services' ? 'secondary' : 'foreground'}
						href="/services"
					>
						Services
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end" className="ml-8 flex align-middle">
				<NavbarItem
					isActive={pathName === '/cart' ? true : false}
					className="hidden lg:flex"
				>
					<Link
						className="z-10 relative"
						color={pathName === '/cart' ? 'secondary' : 'foreground'}
						href="/cart"
					>
						{count !== 0 &&
							<span
								className="absolute -z-10 -right-3.5 -top-3.5 text-sm w-5 h-5 bg-purple-200 text-purple-900 rounded-full align-middle justify-center flex"
							>
								{count}
							</span>
						}
						<FontAwesomeIcon icon={faCartShopping} />
					</Link>
				</NavbarItem>
				<NavbarItem >
					<ThemeSwitcher />
				</NavbarItem>
				<NavbarItem>
					<Button
						className="ml-8 hidden lg:flex"
						as={Link}
						color='secondary'
						href="/login"
						variant="flat">
						Login
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={index}>
						<Link
							color={
								pathName === `/${item.toLowerCase()}` ? "secondary" : "foreground"
							}
							className="w-full"
							href={`${item.toLowerCase()}`}
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	)
}

export default NavBar