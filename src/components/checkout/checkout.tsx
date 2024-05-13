
import type { ProductType, CheckoutType } from '@/types/types';
import { Link } from '@nextui-org/react';
import { CheckoutSection } from '../checkoutSection';
import { getDate } from '@/utiles/getDate';

const Checkout = ({
	checkout,
	checkoutProducts
}: {
	checkoutProducts: {
		quantity: number;
		checkoutDate: Date;
		product: ProductType | null;
	}[],
	checkout: CheckoutType | null;
}) => {

	const checkoutInfo = [
		{ data: checkout?.id, label: "Checkout Id:" },
		{ data: checkout && getDate(checkout.createdAt), label: "Order Date:" },
		{ data: checkout?.name, label: "Client Name:" },
		{ data: checkout?.email, label: "Client Email:" },
		{ data: checkout?.phone, label: "Client Phone:" },
		{ data: checkout?.deliveryDate, label: "Delivery Date:" },
		{ data: checkout?.comment, label: "Client Comment:" },
	]

	const countAveragePrice = (
	) => {
		let price = 0

		checkoutProducts.forEach(element => {
			if (element.product?.price) {
				price += element.product?.price
			}
		})
		return price
	}

	return (
		<div className=' w-full px-20'>

			<h2 className='font-semibold text-xl mb-3'>Client Info</h2>

			<div className='grid grid-cols-2 gap-4'>
				{checkout &&

					<ul className='flex flex-col gap-2'>
						<li>
							<CheckoutSection checkoutId={checkout.id} defaultValue={checkout.status} />
						</li>
						{
							checkoutInfo.map((item, index) => (
								<li className='flex gap-2' key={index}>
									<span className=' font-semibold'>{item.label}</span>
									<span>{item.data}</span>
								</li>
							))
						}

					</ul>
				}

				{checkoutProducts.map((item) => (
					<div key={item.product?.id} className='flex flex-col gap-2'>
						<ul className='flex flex-col gap-2'>
							<li className='flex gap-2'>
								<span className=' font-semibold'>Product Id:</span>
								<span>{item.product?.id}</span>
							</li>
							<li className='flex gap-2'>
								<span className=' font-semibold'>Product Title:</span>
								<span>{item.product?.title}</span>
							</li>
							<li className='flex gap-2'>
								<span className=' font-semibold'>Product Details:</span>
								<span>{item.product?.details}</span>
							</li>
							<li>
								<span className=' font-semibold'>Product Price:</span>
								<span>{item.product?.price}</span>
							</li>
							<li className='flex gap-2'>
								<span className=' font-semibold'>Quantity</span>
								<span>{item.quantity}</span>
							</li>
						</ul>
						<Link color="secondary" href={`/catalog/${item.product?.id}`}>
							Link to product
						</Link>
					</div>
				))}
			</div>


			<div className='flex gap-2 mt-10'>
				<span className=' font-semibold'>Average Price: </span>
				<span>{countAveragePrice()}</span>
			</div>


		</div>
	)
}

export default Checkout