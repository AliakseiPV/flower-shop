'use client'

import { useRouter } from 'next/navigation';

function BackButton({
	className,
	children,
}: React.PropsWithChildren<{
	className?: string
}>) {
	const router = useRouter()

	return (
		<div
			className={className}
			onClick={() => router.back()}
		>
			{children}
		</div>
	);
}

export default BackButton