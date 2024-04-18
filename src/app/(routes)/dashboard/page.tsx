import { AdminTable } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'


const DashboardPage = async () => {

	const checkout = await prisma.checkout.findMany()

	return (

		<div >
			<h1>Dashboard</h1>


			<AdminTable checkout={checkout}/>
	

		</div >


	)
}

export default DashboardPage