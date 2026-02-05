import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Product } from "../../types/models";
import { getAll } from "../../utils/http";
import Cart from "./components/Cart";
import ProductCard from "./components/ProductCard";

interface CartItem {
	product: Product;
	quantity: number;
}

export default function SellPage() {
	const {
		data: products = [],
		isPending,
		isError,
		error,
	} = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => getAll("products"),
		staleTime: 0,
	});

	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (product: Product) => {
		setCart((prev) => {
			const existing = prev.find((item) => item.product.id === product.id);
			if (existing) {
				return prev.map((item) =>
					item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
				);
			}
			return [...prev, { product, quantity: 1 }];
		});
	};

	const removeFromCart = (productId: string) => {
		setCart((prev) => prev.filter((item) => item.product.id !== productId));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity < 1) return;
		setCart((prev) =>
			prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
		);
	};

	const handleCheckout = () => {
		// Placeholder: Implement checkout logic (API call, etc.)
		alert("Checkout successful! (Not implemented)");
		setCart([]);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Sell Products</h1>
			<div className="flex flex-col md:flex-row gap-8">
				{/* Product Cards Grid */}
				<div className="flex-1">
					<h2 className="text-xl font-semibold mb-2">Available Products</h2>
					{isError && (
						<div className="text-red-600">
							{error instanceof Error ? error.message : "Failed to load products."}
						</div>
					)}
					{isPending && <div>Loading products...</div>}
					{!isPending && products.length === 0 && <div>No products found.</div>}
					{!isPending && products.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{products.map((product) => (
								<ProductCard key={product.id} product={product} onAddToCart={addToCart} />
							))}
						</div>
					)}
				</div>

				{/* Cart */}
				<Cart
					cart={cart}
					onRemoveFromCart={removeFromCart}
					onUpdateQuantity={updateQuantity}
					onCheckout={handleCheckout}
				/>
			</div>
		</div>
	);
}
