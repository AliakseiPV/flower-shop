export type ProductType = {
	id: number;
	title: string;
	details: string;
	description: string | null;
	price: number | null;
	img: string[];
	availability: boolean;
	type: string;
	totalSold: number;
	createdAt: Date;
}

export type CartItem = {
	data: ProductType;
	quantity: number;
}

export type CheckoutType = {
	id: string;
	name: string;
	phone: string;
	email: string;
	comment: string | null;
	deliveryDate: string;
	createdAt: Date;
	status: string;
}

