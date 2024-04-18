import { getCheckoutProducts } from "@/actions/checkoutAction";
import Checkout from "@/components/checkout/checkout";
import { prisma } from "@/prisma";


const CheckoutPage = async ({ params }: any) => {

	const checkoutId: string = params.checkoutId
	const checkoutProducts = await getCheckoutProducts(checkoutId)
	const checkout = await prisma.checkout.findUnique({
		where: {
			id: checkoutId
		}
	})

	return (
		<div>
			<Checkout checkoutProducts={checkoutProducts} checkout={checkout} />
		</div>

	)
}



export default CheckoutPage