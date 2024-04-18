"use client"

import { createContext, useEffect, useState } from 'react'
import type { PropsWithChildren } from "react"
import type { cartItem, productType } from '@/types/types'
import { getErrorMessage } from '@/utiles/getErrorMessage'

type Context = {
	cartItems: cartItem[],
	getCartCount: Function
	handleAddToCart: Function,
	handleRemoveOneFromCart: Function,
	handleRemoveAllFromCart: Function,
	handleClearCart: Function
}

const initialContext: Context = {
	cartItems: [],
	getCartCount: () => {
		throw new Error('GetCartCount function must be overridden');
	}, 
	handleAddToCart: () => {
		throw new Error('AddToCart function must be overridden');
	},
	handleRemoveOneFromCart: () => {
		throw new Error('RemoveFromCart function must be overridden');
	},
	handleRemoveAllFromCart: () => {
		throw new Error('RemoveFromCart function must be overridden');
	},
	handleClearCart: () => {
		throw new Error('ClearCart function must be overridden');
	},
}

export const Context = createContext<Context>(initialContext)

const CartContext = ({ children }: PropsWithChildren<unknown>) => {

	const [cartItems, setCartItems] = useState<cartItem[]>(initialContext.cartItems)

	useEffect(() => {
		const cartValues = localStorage.getItem('cart')
		if (cartValues) {
			setCartItems([...JSON.parse(cartValues)])
		}
	}, [])


	const handleAddToCart = (product: productType) => {
		try {
			const existElement = cartItems.find((item) => item.data.id === product.id)

			if (existElement) {
				existElement.quantity++
				setCartItems([...cartItems])
				localStorage.setItem("cart", JSON.stringify(cartItems))

				return
			}

			if (!existElement) {
				setCartItems([...cartItems, { data: { ...product }, quantity: 1 }])
				localStorage.setItem("cart", JSON.stringify([...cartItems, { data: { ...product }, quantity: 1 }]))

				return
			}
		} catch (error) {
			return { error: getErrorMessage(error) }
		}
	}

	const handleRemoveOneFromCart = (product: productType) => {
		try {
			const existElement = cartItems.find((item) => item.data.id === product.id)

			if (existElement && existElement.quantity > 1) {
				existElement.quantity--
				setCartItems([...cartItems])
				localStorage.setItem("cart", JSON.stringify(cartItems))

				return
			}

			if (existElement && existElement.quantity === 1) {
				const result = cartItems.filter((item) => item.data.id !== product.id)
				setCartItems(result)
				localStorage.setItem("cart", JSON.stringify(result))

				return
			}
		} catch (error) {
			return { error: getErrorMessage(error) }
		}
	}

	const handleRemoveAllFromCart = (product: productType) => {
		try {
			const existElement = cartItems.find((item) => item.data.id === product.id)

			if (existElement) {
				const result = cartItems.filter((item) => item.data.id !== product.id)
				setCartItems(result)
				localStorage.setItem("cart", JSON.stringify(result))
				return
			}

		} catch (error) {
			return { error: getErrorMessage(error) }
		}
	}

	const handleClearCart = () => {
		setCartItems(initialContext.cartItems)
		localStorage.clear()
	}

	const getCartCount = () => {
		let count = 0
		cartItems.forEach(element => {
			count += element.quantity
		})

		return count
	}

	return (
		<Context.Provider value={{ cartItems, getCartCount, handleAddToCart, handleRemoveOneFromCart, handleRemoveAllFromCart, handleClearCart }} >
			{children}
		</Context.Provider>
	)
}

export default CartContext

