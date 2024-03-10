import { MouseEventHandler, ReactNode } from "react"

const Button = ({
	clickHandler, style, children
}: {
	clickHandler: MouseEventHandler<HTMLButtonElement>,
	children: ReactNode | undefined,
	style?: string | undefined,
}) => {

	return (
		<button
			onClick={clickHandler}
			className={style}
		>
			{children}
		</button>
	)
}

export default Button