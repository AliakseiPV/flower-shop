import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.upsert({
		where: {
			email: 'test@test.com'
		},
		update: {},
		create: {
			name: 'Admin',
			email: 'test@test.com',
			password: 'password',
			isAdmin: true
		}
	})
	console.log(user);
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (error) => {
		console.error(error)
		await prisma.$disconnect()
		process.exit(1)
	})