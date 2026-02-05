import type { Product } from "../../../types/models";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
	<div className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col justify-between">
		<div>
			<div className="font-semibold text-lg mb-1">{product.name}</div>
			<div className="text-gray-500 text-sm mb-2">ID: {product.productId}</div>
			{/* Add more product details here if needed */}
		</div>
		<button
			type="button"
			className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
			onClick={() => onAddToCart(product)}
		>
			Add to Cart
		</button>
	</div>
);

export default ProductCard;
