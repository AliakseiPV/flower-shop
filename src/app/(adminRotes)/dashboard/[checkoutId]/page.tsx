import { getCheckoutProducts } from "@/actions/checkoutAction";
import { prisma } from "@/prisma";
import Link from "next/link";


const CheckoutPage = async ({ params }: any) => {

	const checkoutId: string = params.checkoutId
	const checkoutProducts = await getCheckoutProducts(checkoutId)
	const checkout = await prisma.checkout.findUnique({
		where: {
			id: checkoutId
		}
	})

	const countAveragePrice = () => {
		let price = 0

		checkoutProducts.forEach(element => {
			if (element.product?.price) {
				price += element.product?.price
			}
		})
		return price
	}


	return (

		<div style={{ marginLeft: '200px' }}>

			<h2>Client Info</h2>

			{checkout &&

				<ul>
					<li>
						<span>Checkout Id:</span>
						<span>{checkout.id}</span>
					</li>
					<li>
						<span>Order Date:</span>
						<span>
							{`${checkout.createdAt.getFullYear()}-${checkout.createdAt.getMonth() + 1}-${checkout?.createdAt.getDay()}`}
						</span>
					</li>
					<li>
						<span>Client Name:</span>
						<span>{checkout.name}</span>
					</li>
					<li>
						<span>Client Email:</span>
						<span>{checkout.email}</span>
					</li>
					<li>
						<span>Client phone:</span>
						<span>{checkout.phone}</span>
					</li>
					<li>
						<span>Delivery Date:</span>
						<span>{checkout.deliveryDate}</span>
					</li>
					<li>
						<span>Client Comment:</span>
						<span>{checkout.comment}</span>
					</li>
					<li>
						<span>Delivery status:</span>
						{
							checkout.status ?
								<span>Fullfiled</span>
								:
								<span>Not delivered</span>
						}
					</li>
				</ul>
			}

			<h2>Checkout Info</h2>

			{checkoutProducts.map((item) => (
				<div key={item.product?.id}>
					<ul>
						<li>
							<span>Product Id:</span>
							<span>{item.product?.id}</span>
						</li>
						<li>
							<span>Product Title:</span>
							<span>{item.product?.title}</span>
						</li>
						<li>
							<span>Product Details:</span>
							<span>{item.product?.details}</span>
						</li>
						<li>
							<span>Product Price:</span>
							<span>{item.product?.price}</span>
						</li>
						<li>
							<span>Quantity</span>
							<span>{item.quantity}</span>
						</li>
					</ul>
					<Link href={`/catalog/${item.product?.id}`}>
						Link to product
					</Link>
				</div>
			))}

			<div>
				<span>Average Price: </span>
				<span>{countAveragePrice()}</span>
			</div>


		</div>
	)
}



export default CheckoutPage