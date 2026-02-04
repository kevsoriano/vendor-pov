export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	dailyTarget: number;
	weeklyTarget: number;
	monthlyTarget: number;
	currency: string;
	addresses: {
		id: string;
		addressLine1: string;
		addressLine2: string;
		city: string;
		country: string;
		postalCode: string;
	}[];
	roles: Role[];
}

export interface Role {
	id: string;
	name: string;
	authorities: Authority[];
	userCount: number;
}

export interface Authority {
	id: string;
	name: string;
}

export interface Supplier {
	id: string;
	name: string;
	productCount: number;
}

export interface Brand {
	id: string;
	name: string;
	productCount: number;
}

export interface Product {
	id: string;
	name: string;
	productId: number;
}

export interface ProductTag {
	id: string;
	name: string;
}
