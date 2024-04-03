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

