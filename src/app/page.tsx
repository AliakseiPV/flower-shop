import { prisma } from '@/prisma'
import { findExistingImg } from '@/utiles/findExistingImg'
import { getBestSellers } from '@/utiles/getBestSellers'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faCarSide, faEnvelope, faOtter, faPhone, faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardBody, CardFooter, Image, Link } from '@nextui-org/react'


export default async function Home() {

	const products = await prisma.product.findMany()
	const bestSellers = getBestSellers(products)

	return (
		<main className='flex flex-col gap-20 min-h-[calc(100vh-25.5rem)]'>
			<div
				className='flex relative w-full h-fit px-20 mt-10 justify-center items-center'
			>
				<div className='flex flex-col items-center z-10 absolute gap-10 text-white'>
					<h1 className='font-bold text-6xl'>
						Blooms To Celebrate <br /> Every Moment
					</h1>
					<p className='text-center w-2/5'>
						Welcome to <b>Purrfect Petals</b>, where every bloom tells a story. Explore our exquisite collection of fresh flowers, beautifully crafted bouquets, and thoughtful gifts. Let us bring a touch of nature's beauty into your life, one petal at a time!
					</p>
					<Button
						href="/catalog"
						as={Link}
						className='font-semibold w-48 text-base'
					>
						Order Now
					</Button>
				</div >
				<Image
					className='w-3/4 top-0 z-0 brightness-75'
					alt="Hero Image"
					src="https://images.pexels.com/photos/758852/pexels-photo-758852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					removeWrapper
				/>
			</div>

			<div className='flex px-20 justify-around w-full h-32 bg-zinc-100 text-lg items-center dark:bg-default-100'>
				<div className='flex items-center gap-4'>
					<FontAwesomeIcon icon={faOtter} size='lg'/>
					<h3>Exclusive Designs</h3>
				</div>
				<div className='flex items-center gap-4'>
					<FontAwesomeIcon icon={faSnowflake} size='lg' />
					<h3>Freshness Guaranteed </h3>
				</div>
				<div className='flex items-center gap-4'>
					<FontAwesomeIcon icon={faCarSide} size='lg' />
					<h3>Next Day Delivery</h3>
				</div>
			</div>

			<div className='w-full flex flex-col items-center'>
				<div className='w-fit flex flex-col gap-5'>
					<h2 className='font-semibold text-lg'>Browse Designs:</h2>
					<div className='flex gap-20'>
						{bestSellers.map((product, index) => (
							<Link href={`/catalog/${product.id}`} key={index}>
								<Card shadow="none" radius='sm'  isPressable>
									<CardBody className="overflow-visible p-0">
										<Image
											isZoomed
											shadow="none"
											radius="sm"
											alt={product.title}
											className="object-cover w-72 h-80"
											src={`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}/productsImages/${product.img[findExistingImg(product).id]}`}
										/>
									</CardBody>
									<CardFooter
										className="flex flex-col items-start gap-1 bg-zinc-50 dark:bg-default-50"
									>
										<b>{product.title}</b>
										<p className="text-default-500">${product.price}</p>
									</CardFooter>
								</Card>
							</Link>
						))}
					</div>
					<Link href={'/catalog'} className='justify-end' color="foreground">
						see more...
					</Link>
				</div>
			</div>

			<div className='grid grid-cols-2'>
				<div className='flex flex-col justify-center items-center bg-zinc-100 dark:bg-default-100 gap-4 text-center'>
					<h3 className='font-semibold text-2xl'>Next Day Delivery</h3>
					<p>We offer next day deliver in Nassau county,<br /> Queens, and Brooklyn.</p>
					<Button as={Link} href='/catalog' variant="bordered" className='font-semibold'>Order now</Button>
				</div>
				<Image
					radius='none'
					alt={'Order image'}
					src='https://images.pexels.com/photos/122737/pexels-photo-122737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
				/>
				<Image
					radius='none'
					alt={'Order image'}
					src='https://images.pexels.com/photos/67857/daisy-flower-spring-marguerite-67857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
				/>
				<div className='flex flex-col justify-center items-center bg-zinc-100 dark:bg-default-100 gap-4 text-center'>
					<h3 className='font-semibold text-2xl'>Designed with Love</h3>
					<p>Made by our in house florists <br /> that are available 24/7</p>
					<Button as={Link} href='/services' variant="bordered" className='font-semibold'>Subscribe</Button>
				</div>
			</div>

			<div className='flex flex-col text-center gap-4'>
				<h2 className=' text-2xl font-semibold'>About Us</h2>
				<p>Purrfect Petals is a small family owned business. Started by two florists<br /> from Belarus with a love and passion for floral design and flowers.</p>
			</div>

			<div className='grid grid-cols-4'>
				<Image
					radius='none'
					alt={'Order image'}
					src={'https://images.pexels.com/photos/758852/pexels-photo-758852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
				/>
				<Image
					radius='none'
					alt={'Order image'}
					src={'https://images.pexels.com/photos/758852/pexels-photo-758852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
				/>
				<Image
					radius='none'
					alt={'Order image'}
					src={'https://images.pexels.com/photos/758852/pexels-photo-758852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
				/>
				<Image
					radius='none'
					alt={'Order image'}
					src={'https://images.pexels.com/photos/758852/pexels-photo-758852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
				/>
			</div>

			<div className='flex px-20 justify-around w-full h-32 bg-zinc-100 items-center dark:bg-default-100'>
				<h2 className='text-lg font-semibold'>Contact us at:</h2>
				<div className='flex items-center gap-2'>
					<FontAwesomeIcon icon={faPhone} />
					<span>631-943-9252</span>
				</div>
				<div className='flex items-center gap-2'>
					<FontAwesomeIcon icon={faEnvelope} />
					<span>flowers.purrfectpetals@gmail.com</span>
				</div>
				<div className='flex items-center gap-2'>
					<FontAwesomeIcon icon={faInstagram as IconProp} />
					<span>@purrfect.petals</span>
				</div>

			</div>

		</main>
	)
}
