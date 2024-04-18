export type productType = {
	id: number;
	title: string;
	details: string;
	description: string | null;
	price: number | null;
	img: string[];
	availability: boolean;
	type: string;
	createdAt: Date;
}

export type cartItem = {
	data: productType;
	quantity: number;
}

export type checkoutType = {
	id: string;
	name: string;
	phone: string;
	email: string;
	comment: string | null;
	deliveryDate: string;
	createdAt: Date;
	status: string;
}

