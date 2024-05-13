import { faFacebook, faGoogle, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Input, Link } from "@nextui-org/react"
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


const Footer = async () => {

	const { isAuthenticated } = getKindeServerSession()
	const isLoggedIn = await isAuthenticated()

	return (
		<footer
			className="w-full bottom-0 left-0 grid grid-cols-3 items-center px-20 pt-10 pb-14 mt-20 gap-10 bg-zinc-100 dark:bg-default-100 "
		>
			<div className="flex flex-col gap-5">
				<h4 className="font-semibold">subscribe</h4>
				<p>Want to learn more and keep in touch?<br /> Sign up for our newsletter!</p>
				<form className="flex items-end">
					<Input type="email" variant={'underlined'} label="Email" className="max-w-60 min-w-52" />
					<Button type="button">
						<FontAwesomeIcon icon={faPaperPlane} />
					</Button>
				</form>

			</div>
			<div className="flex flex-col gap-5">
				<h4 className=" font-semibold">sitemap</h4>
				<ul className="flex flex-col gap-2">
					<li><Link color="foreground" href="/">Home</Link></li>
					<li><Link color="foreground" href="/catalog">Catalog</Link></li>
					<li><Link color="foreground" href="/about">About</Link></li>
					<li><Link color="foreground" href="/servises">Services</Link></li>
					{!isLoggedIn
						?
						<li><LoginLink>Login</LoginLink></li>
						:
						<li><LogoutLink>Logout</LogoutLink></li>
					}
					
				</ul>
			</div>
			<div className="flex flex-col gap-5">
				<h4 className=" font-semibold">about</h4>
				<p>founded in 2024, Purrfect Petals is a family business<br /> founded by two florists trained in Belarus.</p>
				<div className="flex flex-col gap-2">
					<span>Follow us on:</span>
					<div className="flex gap-4">
						<Link href="/" color="foreground">
							<FontAwesomeIcon icon={faGoogle as IconProp} size="xl" />
						</Link>
						<Link href="/" color="foreground">
							<FontAwesomeIcon icon={faFacebook as IconProp} size="xl" />
						</Link>
						<Link href="/" color="foreground">
							<FontAwesomeIcon icon={faInstagram as IconProp} size="xl" />
						</Link>
						<Link href="/" color="foreground">
							<FontAwesomeIcon icon={faTiktok as IconProp} size="xl" />
						</Link>
					</div>
				</div>
			</div>

		</footer>
	)
}

export default Footer