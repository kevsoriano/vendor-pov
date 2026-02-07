import { useState } from "react";
import type { Product, ProductVariant } from "../../../types/models";
import VariantSelectionModal from "./VariantSelectionModal";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product, variant?: ProductVariant) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const hasMultipleVariants =
		product.productVariants && product.productVariants.length > 1;

	const handleAddToCart = () => {
		if (hasMultipleVariants) {
			setIsModalOpen(true);
		} else {
			onAddToCart(product);
		}
	};

	const handleVariantSelect = (variant: ProductVariant) => {
		onAddToCart(product, variant);
	};

	return (
		<>
			<div className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
		{/* Product Image */}
		<div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			<div className="relative z-10 text-gray-300 group-hover:text-gray-400 transition-colors">
				<svg
					className="w-20 h-20"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Product image placeholder</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
					/>
				</svg>
			</div>
		</div>

		{/* Product Details */}
		<div className="p-5 flex flex-col flex-grow">
			<div className="flex-grow">
				<h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors text-center">
					{product.name}
				</h3>
				
				{product.description && (
					<p className="text-gray-600 text-sm text-center line-clamp-3 mt-2">
						{product.description}
					</p>
				)}
			</div>

			{/* Action */}
			<div className="mt-4 pt-4 border-t border-gray-100">
				<button
					type="button"
					className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg font-medium 
					         hover:from-blue-700 hover:to-blue-800 active:scale-95 
					         transition-all duration-200 shadow-sm hover:shadow-md"
					onClick={handleAddToCart}
				>
					{hasMultipleVariants ? "Select Variant" : "Add to Cart"}
				</button>
			</div>
		</div>
	</div>

			<VariantSelectionModal
				key={isModalOpen ? "open" : "closed"}
				product={product}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSelectVariant={handleVariantSelect}
			/>
		</>
	);
};

export default ProductCard;
