import { AdminTable } from '@/components'
import { prisma } from '@/prisma'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {

	const { isAuthenticated, getPermission } = getKindeServerSession()
	const isLoggedIn = await isAuthenticated()

	if (!isLoggedIn) {
		redirect('/')
	}

	const requiredPremission = await getPermission('update:status')
	if (!requiredPremission?.isGranted) {
		redirect('/')
	}

	const checkout = await prisma.checkout.findMany()




	return (

		<main className='w-fit flex flex-col gap-10 px-20 pt-5'>
			<h1 className='font-semibold text-xl'>Dashboard</h1>

			<div className='w-full flex items-center'>
				<AdminTable checkout={checkout} />
			</div>



		</main >


	)
}

export default DashboardPage