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

export interface Outlet {
	id: string;
	name: string;
}

export interface Brand {
	id: string;
	name: string;
	productCount: number;
}

export interface ProductAttribute {
	id: string;
	attributeKey: string;
	attributeValue: string;
}

export interface SupplierProductVariants {
	supplier: Supplier;
	supplierPrice: number;
}

export interface Inventories {
	outlet: Outlet;
	supplier: Supplier;
	quantity: number;
	reorderThreshold: number;
	reorderQuantity: number;
}

export interface ProductVariant {
	id: string;
	variantSku: string;
	retailPrice: number;
	taxRate: number;
	productAttributes: ProductAttribute[];
	supplierProductVariants: SupplierProductVariants[];
	inventories: Inventories[];
}

export interface Product {
	id: string;
	name: string;
	productId: number;
	description?: string;
	productVariants?: ProductVariant[];
}

export interface ProductTag {
	id: string;
	name: string;
}
