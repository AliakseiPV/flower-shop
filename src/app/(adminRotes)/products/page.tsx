import { FC } from 'react'
import { prisma } from '@/prisma'

const ProductsPage: FC = async () => {
	const user = await prisma.user.findFirst({
		where: {
			email: 'test@test.com'
		}
	})

	return (
		<div>Hello {user?.name}</div>
	)
}

export default ProductsPage