'use client'

import { Context } from "@/context/cartContext"
import { useContext, useState } from "react"
import { ThemeSwitcher } from "../themeSwitcher"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Spinner } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from 'next/navigation'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

const menuItems = [
	"Dashboard",
	"Products",
	"Catalog",
	"About",
	"Services",
	"Cart",
	"Login",
]

const mainRotes = [
	{ path: '/dashboard', name: "Dashboard", requiredPremissions: ['add:product'] },
	{ path: '/products', name: "Products", requiredPremissions: ['add:product'] },
	{ path: '/catalog', name: "Catalog" },
	{ path: '/about', name: "About" },
	{ path: '/services', name: "Services" }
]

const NavBar = () => {

	const { getPermissions } = useKindeBrowserClient()

	const { permissions } = getPermissions()

	const pathName = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { getCartCount } = useContext(Context)
	const count = getCartCount()

	return (
		<Navbar
			shouldHideOnScroll
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="lg:hidden"
				/>
				<NavbarBrand>
					<NavbarItem>
						<Link className="font-semibold text-xl" color="foreground" href="/">
							Perrfect Petals
						</Link>
					</NavbarItem>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden lg:flex gap-4" justify="center">
				{mainRotes.map(({ path, name, requiredPremissions }) => {
					if (!requiredPremissions || requiredPremissions?.every(p => permissions?.includes(p))) {
						return (
							<NavbarItem key={name} isActive={pathName === path ? true : false} >
								<Link
									color={pathName === path ? 'secondary' : 'foreground'}
									href={path}>
									{name}
								</Link>
							</NavbarItem>)
					}
				})}
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