'use client'

import { Context } from "@/context/cartContext"
import { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faEraser, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButton } from "../actionButton"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { findExistingImg } from "@/utiles/findExistingImg"

const CartList = () => {

	const { cartItems, handleRemoveOneFromCart, handleRemoveAllFromCart } = useContext(Context)

	return (
		<div>
			{cartItems.map(product => (

				<div key={product.data.id}>


					<Card className="py-4 relative max-w-[250px]">
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">

							<ActionButton
								isIconOnly={true}
								isDisabled={false}
								clickAction={() => handleRemoveAllFromCart(product.data)}
								className="font-semibold text-red-700 absolute right-4 top-4"
								successMessage={`${product.data.title} sucsessfully deleted`}
							>
								<FontAwesomeIcon icon={faTrash} />
							</ActionButton>

							<h2 className="text-tiny uppercase font-bold">{product.data.title}</h2>
							<small className="text-default-500">{product.data.details}</small>

						</CardHeader>
						<CardBody className="overflow-visible py-2">
							<Image
								alt="Card background"
								className="object-cover rounded-xl w-40 h-52"
								src={`${process.env.NEXT_PUBLIC_AWS_S3_OBJECT_URL}/productsImages/${findExistingImg(product.data).name}`}
							/>
							<div className="font-bold text-large flex gap-2  items-center">
								<span>quantity:</span>
								<span >{product.quantity}</span>
								<ActionButton
									isDisabled={false}
									isIconOnly={true}
									clickAction={() => handleRemoveOneFromCart(product.data)}
									className="text-red-700 font-semibold text-xl"
									successMessage={`${product.data.title} sucsessfully deleted`}>
									<FontAwesomeIcon icon={faMinus} />
								</ActionButton>
							</div>
						</CardBody>
					</Card>

				</div>

			))}

		</div>
	)
}

export default CartList