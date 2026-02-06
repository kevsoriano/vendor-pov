import type { Product, ProductVariant } from "../../../types/models";

interface CartItem {
	product: Product;
	variant?: ProductVariant;
	quantity: number;
}

interface CartProps {
	cart: CartItem[];
	onRemoveFromCart: (productId: string, variantId?: string) => void;
	onUpdateQuantity: (productId: string, quantity: number, variantId?: string) => void;
	onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveFromCart, onUpdateQuantity, onCheckout }) => {
	// Calculate total items in cart
	const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
	return (
		<div className="w-full md:w-1/3 bg-white p-6 rounded-2xl border border-gray-200 shadow-xl">
			<h2 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
				<svg
					className="w-6 h-6 text-green-500"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					viewBox="0 0 24 24"
					role="img"
					aria-label="Cart Icon"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6h13"
					/>
				</svg>
				Cart
			</h2>
			{cart.length === 0 ? (
				<div className="text-gray-500 italic">Your cart is empty.</div>
			) : (
				<>
					<table className="min-w-full mb-4 text-sm">
						<thead>
							<tr className="bg-gray-100">
								<th className="py-2 px-2 rounded-tl-lg">Name</th>
								<th className="py-2 px-2">Qty</th>
								<th className="py-2 px-2 rounded-tr-lg">Remove</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item, idx) => (
								<tr
									key={`${item.product.id}-${item.variant?.id || "no-variant"}`}
									className={
										idx % 2 === 0
											? "bg-gray-50 hover:bg-green-50 transition"
											: "hover:bg-green-50 transition"
									}
								>
									<td className="py-2 px-2 text-center">
										<div className="font-medium">{item.product.name}</div>
										{item.variant && (
											<div className="text-xs text-gray-500 mt-1">
												{item.variant.productAttributes
													?.map((attr) => `${attr.attributeKey}: ${attr.attributeValue}`)
													.join(" • ") || item.variant.variantSku}
											</div>
										)}
									</td>
									<td className="py-2 px-2 text-center">
										<input
											type="number"
											min={1}
											value={item.quantity}
											onChange={(e) =>
												onUpdateQuantity(
													item.product.id,
													Number(e.target.value),
													item.variant?.id,
												)
											}
											className="w-16 border border-green-300 rounded px-2 py-1 text-center focus:ring-2 focus:ring-green-400 outline-none transition"
										/>
									</td>
									<td className="py-2 px-2 text-center">
										<button
											type="button"
											className="text-red-600 font-semibold hover:underline hover:text-red-800 transition"
											onClick={() => onRemoveFromCart(item.product.id, item.variant?.id)}
										>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="flex justify-between items-center mb-4 px-1">
						<span className="text-gray-700 font-semibold">Total Items:</span>
						<span className="text-lg font-bold text-green-700">{totalItems}</span>
					</div>
					<button
						type="button"
						className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-800 font-bold text-lg w-full transition"
						onClick={onCheckout}
					>
						Checkout
					</button>
				</>
			)}
		</div>
	);
};

export default Cart;
