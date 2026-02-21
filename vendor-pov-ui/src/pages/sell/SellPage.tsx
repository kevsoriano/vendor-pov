import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { OutletContext } from "../../context/OutletContext";
import type { Product, ProductVariant } from "../../types/models";
import { getAll } from "../../utils/http";
import Cart from "./components/Cart";
import ProductCard from "./components/ProductCard";

interface CartItem {
	product: Product;
	variant?: ProductVariant;
	quantity: number;
}

export default function SellPage() {
	const { selectedOutlet } = useContext(OutletContext);

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

	const addToCart = (product: Product, variant?: ProductVariant) => {
		setCart((prev) => {
			// Create a unique key based on product and variant
			const cartKey = variant ? `${product.id}-${variant.id}` : product.id;
			const existing = prev.find((item) => {
				const itemKey = item.variant
					? `${item.product.id}-${item.variant.id}`
					: item.product.id;
				return itemKey === cartKey;
			});

			if (existing) {
				return prev.map((item) => {
					const itemKey = item.variant
						? `${item.product.id}-${item.variant.id}`
						: item.product.id;
					return itemKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item;
				});
			}
			return [...prev, { product, variant, quantity: 1 }];
		});
	};

	const removeFromCart = (productId: string, variantId?: string) => {
		setCart((prev) =>
			prev.filter((item) => {
				const itemKey = item.variant
					? `${item.product.id}-${item.variant.id}`
					: item.product.id;
				const targetKey = variantId ? `${productId}-${variantId}` : productId;
				return itemKey !== targetKey;
			}),
		);
	};

	const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
		if (quantity < 1) return;
		setCart((prev) =>
			prev.map((item) => {
				const itemKey = item.variant
					? `${item.product.id}-${item.variant.id}`
					: item.product.id;
				const targetKey = variantId ? `${productId}-${variantId}` : productId;
				return itemKey === targetKey ? { ...item, quantity } : item;
			}),
		);
	};

	const handleCheckout = () => {
		// Build payload of sale line items
		const saleLineItems = cart.map((item) => ({
			variantId: item.variant?.id || null,
			variantSku: item.variant?.variantSku || null,
			price: item.variant?.retailPrice || 0,
			quantity: item.quantity,
			lineTotal: (item.variant?.retailPrice || 0) * item.quantity,
		}));

		const checkoutPayload = {
			totalAmount: saleLineItems.reduce((sum, item) => sum + item.lineTotal, 0),
			discountAmount: 0, // Placeholder for any discounts
			saleLineItems,
			outlet: {
				id: selectedOutlet,
			},
			saleDate: new Date().toISOString(),
		};

		console.log("🛒 Checkout Payload:", checkoutPayload);

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
