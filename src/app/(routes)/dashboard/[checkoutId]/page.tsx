import { getCheckoutProducts } from "@/actions/checkoutAction";
import Checkout from "@/components/checkout/checkout";
import { prisma } from "@/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


const CheckoutPage = async ({ params }: any) => {

	const { isAuthenticated, getPermission } = getKindeServerSession()
	const isLoggedIn = await isAuthenticated()

	if (!isLoggedIn) {
		redirect('/')
	}

	const requiredPremission = await getPermission('update:status')
	if (!requiredPremission?.isGranted) {
		redirect('/')
	}

	const checkoutId: string = params.checkoutId
	const checkoutProducts = await getCheckoutProducts(checkoutId)
	const checkout = await prisma.checkout.findUnique({
		where: {
			id: checkoutId
		}
	})

	return (
		<main className="pt-5">
			<Checkout
				checkoutProducts={checkoutProducts}
				checkout={checkout}
			/>
		</main>
	)
}



export default CheckoutPage