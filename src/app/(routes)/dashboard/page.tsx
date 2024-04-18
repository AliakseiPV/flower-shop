import { AdminTable } from '@/components'
import { prisma } from '@/prisma'
import Link from 'next/link'


const DashboardPage = async () => {

	const checkout = await prisma.checkout.findMany()

	return (

		<div >
			<h1>Dashboard</h1>


			<AdminTable checkout={checkout}/>
			{/* <table>
				<thead>
					<tr>
						<th colSpan={7}>Orders</th>
					</tr>
					<tr>
						<th>Id</th>
						<th>CreatedAt</th>
						<th>Client Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Delovery date</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{
						checkout.map((item) => (
							<tr key={item.id}>

								<td>{item.id}</td>
								<td>
									{`${item.createdAt.getFullYear()}-${item.createdAt.getMonth() + 1}-${item.createdAt.getDay()}`}
								</td>
								<td>{item.name}</td>
								<td>{item.email}</td>
								<td>{item.phone}</td>
								<td>{item.deliveryDate}</td>
								<td>{item.status}</td>
								<td><Link href={`/dashboard/${item.id}`}></Link></td>
							</tr>
						))
					}
				</tbody>
			</table> */}

		</div >


	)
}

export default DashboardPage